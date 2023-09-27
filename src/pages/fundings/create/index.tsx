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
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createFunding } from 'apiSdk/fundings';
import { fundingValidationSchema } from 'validationSchema/fundings';
import { ApplicationInterface } from 'interfaces/application';
import { getApplications } from 'apiSdk/applications';
import { FundingInterface } from 'interfaces/funding';

function FundingCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FundingInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFunding(values);
      resetForm();
      router.push('/fundings');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FundingInterface>({
    initialValues: {
      amount: 0,
      funding_date: new Date(new Date().toDateString()),
      funding_status: '',
      application_id: (router.query.application_id as string) ?? null,
    },
    validationSchema: fundingValidationSchema,
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
              label: 'Fundings',
              link: '/fundings',
            },
            {
              label: 'Create Funding',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Funding
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Amount"
            formControlProps={{
              id: 'amount',
              isInvalid: !!formik.errors?.amount,
            }}
            name="amount"
            error={formik.errors?.amount}
            value={formik.values?.amount}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="funding_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Funding Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.funding_date ? new Date(formik.values?.funding_date) : null}
              onChange={(value: Date) => formik.setFieldValue('funding_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.funding_status}
            label={'Funding Status'}
            props={{
              name: 'funding_status',
              placeholder: 'Funding Status',
              value: formik.values?.funding_status,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<ApplicationInterface>
            formik={formik}
            name={'application_id'}
            label={'Select Application'}
            placeholder={'Select Application'}
            fetcher={getApplications}
            labelField={'status'}
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
              onClick={() => router.push('/fundings')}
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
    entity: 'funding',
    operation: AccessOperationEnum.CREATE,
  }),
)(FundingCreatePage);
