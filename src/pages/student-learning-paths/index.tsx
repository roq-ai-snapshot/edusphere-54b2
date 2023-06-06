import { useState } from 'react';
import AppLayout from 'layout/app-layout';
import NextLink from 'next/link';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Box, Text, Button, Link } from '@chakra-ui/react';
import useSWR from 'swr';
import { Spinner } from '@chakra-ui/react';
import { getStudentLearningPaths, deleteStudentLearningPathById } from 'apiSdk/student-learning-paths';
import { StudentLearningPathInterface } from 'interfaces/student-learning-path';
import { Error } from 'components/error';
import { AccessOperationEnum, AccessServiceEnum, useAuthorizationApi, withAuthorization } from '@roq/nextjs';

function StudentLearningPathListPage() {
  const { hasAccess } = useAuthorizationApi();
  const { data, error, isLoading, mutate } = useSWR<StudentLearningPathInterface[]>(
    () => '/student-learning-paths',
    () =>
      getStudentLearningPaths({
        relations: ['student', 'learning_path'],
      }),
  );

  const [deleteError, setDeleteError] = useState(null);

  const handleDelete = async (id: string) => {
    setDeleteError(null);
    try {
      await deleteStudentLearningPathById(id);
      await mutate();
    } catch (error) {
      setDeleteError(error);
    }
  };

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Student Learning Path
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {hasAccess('student_learning_path', AccessOperationEnum.CREATE, AccessServiceEnum.PROJECT) && (
          <Link href={`/student-learning-paths/create`}>
            <Button colorScheme="blue" mr="4">
              Create
            </Button>
          </Link>
        )}
        {error && <Error error={error} />}
        {deleteError && <Error error={deleteError} />}
        {isLoading ? (
          <Spinner />
        ) : (
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  {hasAccess('student', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && <Th>student</Th>}
                  {hasAccess('learning_path', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                    <Th>learning_path</Th>
                  )}

                  {hasAccess('student_learning_path', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
                    <Th>Edit</Th>
                  )}
                  {hasAccess('student_learning_path', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                    <Th>View</Th>
                  )}
                  {hasAccess('student_learning_path', AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT) && (
                    <Th>Delete</Th>
                  )}
                </Tr>
              </Thead>
              <Tbody>
                {data?.map((record) => (
                  <Tr key={record.id}>
                    {hasAccess('student', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Link as={NextLink} href={`/students/view/${record.student?.id}`}>
                          {record.student?.user_id}
                        </Link>
                      </Td>
                    )}
                    {hasAccess('learning_path', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Link as={NextLink} href={`/learning-paths/view/${record.learning_path?.id}`}>
                          {record.learning_path?.name}
                        </Link>
                      </Td>
                    )}

                    {hasAccess('student_learning_path', AccessOperationEnum.UPDATE, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <NextLink href={`/student-learning-paths/edit/${record.id}`} passHref legacyBehavior>
                          <Button as="a">Edit</Button>
                        </NextLink>
                      </Td>
                    )}
                    {hasAccess('student_learning_path', AccessOperationEnum.READ, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <NextLink href={`/student-learning-paths/view/${record.id}`} passHref legacyBehavior>
                          <Button as="a">View</Button>
                        </NextLink>
                      </Td>
                    )}
                    {hasAccess('student_learning_path', AccessOperationEnum.DELETE, AccessServiceEnum.PROJECT) && (
                      <Td>
                        <Button onClick={() => handleDelete(record.id)}>Delete</Button>
                      </Td>
                    )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </AppLayout>
  );
}
export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'student_learning_path',
  operation: AccessOperationEnum.READ,
})(StudentLearningPathListPage);
