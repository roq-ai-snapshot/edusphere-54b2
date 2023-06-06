import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { teacherCourseValidationSchema } from 'validationSchema/teacher-courses';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.teacher_course
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTeacherCourseById();
    case 'PUT':
      return updateTeacherCourseById();
    case 'DELETE':
      return deleteTeacherCourseById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTeacherCourseById() {
    const data = await prisma.teacher_course.findFirst(convertQueryToPrismaUtil(req.query, 'teacher_course'));
    return res.status(200).json(data);
  }

  async function updateTeacherCourseById() {
    await teacherCourseValidationSchema.validate(req.body);
    const data = await prisma.teacher_course.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteTeacherCourseById() {
    const data = await prisma.teacher_course.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
