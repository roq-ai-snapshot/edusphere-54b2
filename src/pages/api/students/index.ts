import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { studentValidationSchema } from 'validationSchema/students';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getStudents();
    case 'POST':
      return createStudent();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getStudents() {
    const data = await prisma.student
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'student'));
    return res.status(200).json(data);
  }

  async function createStudent() {
    await studentValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.parent?.length > 0) {
      const create_parent = body.parent;
      body.parent = {
        create: create_parent,
      };
    } else {
      delete body.parent;
    }
    if (body?.progress_report?.length > 0) {
      const create_progress_report = body.progress_report;
      body.progress_report = {
        create: create_progress_report,
      };
    } else {
      delete body.progress_report;
    }
    if (body?.student_course?.length > 0) {
      const create_student_course = body.student_course;
      body.student_course = {
        create: create_student_course,
      };
    } else {
      delete body.student_course;
    }
    if (body?.student_learning_path?.length > 0) {
      const create_student_learning_path = body.student_learning_path;
      body.student_learning_path = {
        create: create_student_learning_path,
      };
    } else {
      delete body.student_learning_path;
    }
    const data = await prisma.student.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
