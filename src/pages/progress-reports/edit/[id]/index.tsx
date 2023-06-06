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
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useFormik, FormikHelpers } from 'formik';
import { getProgressReportById, updateProgressReportById } from 'apiSdk/progress-reports';
import { Error } from 'components/error';
import { progressReportValidationSchema } from 'validationSchema/progress-reports';
import { ProgressReportInterface } from 'interfaces/progress-report';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { StudentInterface } from 'interfaces/student';
import { CourseInterface } from 'interfaces/course';
import { getStudents } from 'apiSdk/students';
import { getCourses } from 'apiSdk/courses';

function ProgressReportEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<ProgressReportInterface>(
    () => (id ? `/progress-reports/${id}` : null),
    () => getProgressReportById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ProgressReportInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateProgressReportById(id, values);
      mutate(updated);
      resetForm();
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<ProgressReportInterface>({
    initialValues: data,
    validationSchema: progressReportValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Edit Progress Report
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        {formError && <Error error={formError} />}
        {isLoading || (!formik.values && !error) ? (
          <Spinner />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="progress" mb="4" isInvalid={!!formik.errors?.progress}>
              <FormLabel>Progress</FormLabel>
              <NumberInput
                name="progress"
                value={formik.values?.progress}
                onChange={(valueString, valueNumber) =>
                  formik.setFieldValue('progress', Number.isNaN(valueNumber) ? 0 : valueNumber)
                }
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              {formik.errors.progress && <FormErrorMessage>{formik.errors?.progress}</FormErrorMessage>}
            </FormControl>
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
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'progress_report',
  operation: AccessOperationEnum.UPDATE,
})(ProgressReportEditPage);
