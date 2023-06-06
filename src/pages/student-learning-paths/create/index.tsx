import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createStudentLearningPath } from 'apiSdk/student-learning-paths';
import { Error } from 'components/error';
import { studentLearningPathValidationSchema } from 'validationSchema/student-learning-paths';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { StudentInterface } from 'interfaces/student';
import { LearningPathInterface } from 'interfaces/learning-path';
import { getStudents } from 'apiSdk/students';
import { getLearningPaths } from 'apiSdk/learning-paths';
import { StudentLearningPathInterface } from 'interfaces/student-learning-path';

function StudentLearningPathCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: StudentLearningPathInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createStudentLearningPath(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<StudentLearningPathInterface>({
    initialValues: {
      student_id: (router.query.student_id as string) ?? null,
      learning_path_id: (router.query.learning_path_id as string) ?? null,
    },
    validationSchema: studentLearningPathValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Student Learning Path
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<StudentInterface>
            formik={formik}
            name={'student_id'}
            label={'Select Student'}
            placeholder={'Select Student'}
            fetcher={getStudents}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.user_id}
              </option>
            )}
          />
          <AsyncSelect<LearningPathInterface>
            formik={formik}
            name={'learning_path_id'}
            label={'Select Learning Path'}
            placeholder={'Select Learning Path'}
            fetcher={getLearningPaths}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'student_learning_path',
  operation: AccessOperationEnum.CREATE,
})(StudentLearningPathCreatePage);
