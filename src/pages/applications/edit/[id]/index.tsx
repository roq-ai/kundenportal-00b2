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
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getApplicationById, updateApplicationById } from 'apiSdk/applications';
import { applicationValidationSchema } from 'validationSchema/applications';
import { ApplicationInterface } from 'interfaces/application';
import { ProgramInterface } from 'interfaces/program';
import { UserInterface } from 'interfaces/user';
import { getPrograms } from 'apiSdk/programs';
import { getUsers } from 'apiSdk/users';

function ApplicationEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<ApplicationInterface>(
    () => (id ? `/applications/${id}` : null),
    () => getApplicationById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ApplicationInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateApplicationById(id, values);
      mutate(updated);
      resetForm();
      router.push('/applications');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<ApplicationInterface>({
    initialValues: data,
    validationSchema: applicationValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Applications',
              link: '/applications',
            },
            {
              label: 'Update Application',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Application
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.status}
            label={'Status'}
            props={{
              name: 'status',
              placeholder: 'Status',
              value: formik.values?.status,
              onChange: formik.handleChange,
            }}
          />

          <FormControl id="submission_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Submission Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.submission_date ? new Date(formik.values?.submission_date) : null}
              onChange={(value: Date) => formik.setFieldValue('submission_date', value)}
            />
          </FormControl>
          <FormControl id="approval_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Approval Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.approval_date ? new Date(formik.values?.approval_date) : null}
              onChange={(value: Date) => formik.setFieldValue('approval_date', value)}
            />
          </FormControl>
          <FormControl id="rejection_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Rejection Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.rejection_date ? new Date(formik.values?.rejection_date) : null}
              onChange={(value: Date) => formik.setFieldValue('rejection_date', value)}
            />
          </FormControl>
          <AsyncSelect<ProgramInterface>
            formik={formik}
            name={'program_id'}
            label={'Select Program'}
            placeholder={'Select Program'}
            fetcher={getPrograms}
            labelField={'name'}
          />
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/applications')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'application',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ApplicationEditPage);
