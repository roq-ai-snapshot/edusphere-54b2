import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { progressReportValidationSchema } from 'validationSchema/progress-reports';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.progress_report
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getProgressReportById();
    case 'PUT':
      return updateProgressReportById();
    case 'DELETE':
      return deleteProgressReportById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getProgressReportById() {
    const data = await prisma.progress_report.findFirst(convertQueryToPrismaUtil(req.query, 'progress_report'));
    return res.status(200).json(data);
  }

  async function updateProgressReportById() {
    await progressReportValidationSchema.validate(req.body);
    const data = await prisma.progress_report.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteProgressReportById() {
    const data = await prisma.progress_report.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
