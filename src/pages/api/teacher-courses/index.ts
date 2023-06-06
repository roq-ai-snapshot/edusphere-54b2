import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { teacherCourseValidationSchema } from 'validationSchema/teacher-courses';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getTeacherCourses();
    case 'POST':
      return createTeacherCourse();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTeacherCourses() {
    const data = await prisma.teacher_course
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'teacher_course'));
    return res.status(200).json(data);
  }

  async function createTeacherCourse() {
    await teacherCourseValidationSchema.validate(req.body);
    const body = { ...req.body };

    const data = await prisma.teacher_course.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
