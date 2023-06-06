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
import { createTeacherCourse } from 'apiSdk/teacher-courses';
import { Error } from 'components/error';
import { teacherCourseValidationSchema } from 'validationSchema/teacher-courses';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { TeacherInterface } from 'interfaces/teacher';
import { CourseInterface } from 'interfaces/course';
import { getTeachers } from 'apiSdk/teachers';
import { getCourses } from 'apiSdk/courses';
import { TeacherCourseInterface } from 'interfaces/teacher-course';

function TeacherCourseCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: TeacherCourseInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createTeacherCourse(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<TeacherCourseInterface>({
    initialValues: {
      teacher_id: (router.query.teacher_id as string) ?? null,
      course_id: (router.query.course_id as string) ?? null,
    },
    validationSchema: teacherCourseValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Teacher Course
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <AsyncSelect<TeacherInterface>
            formik={formik}
            name={'teacher_id'}
            label={'Select Teacher'}
            placeholder={'Select Teacher'}
            fetcher={getTeachers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.user_id}
              </option>
            )}
          />
          <AsyncSelect<CourseInterface>
            formik={formik}
            name={'course_id'}
            label={'Select Course'}
            placeholder={'Select Course'}
            fetcher={getCourses}
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
  entity: 'teacher_course',
  operation: AccessOperationEnum.CREATE,
})(TeacherCourseCreatePage);
