/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createGuest } from "../graphql/mutations";
const client = generateClient();
export default function GuestCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    first: "",
    last: "",
    attending_ceremony: "",
    attending_brunch: false,
    attending_rehearsal: false,
    attending_happy_hour: false,
  };
  const [first, setFirst] = React.useState(initialValues.first);
  const [last, setLast] = React.useState(initialValues.last);
  const [attending_ceremony, setAttending_ceremony] = React.useState(
    initialValues.attending_ceremony
  );
  const [attending_brunch, setAttending_brunch] = React.useState(
    initialValues.attending_brunch
  );
  const [attending_rehearsal, setAttending_rehearsal] = React.useState(
    initialValues.attending_rehearsal
  );
  const [attending_happy_hour, setAttending_happy_hour] = React.useState(
    initialValues.attending_happy_hour
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setFirst(initialValues.first);
    setLast(initialValues.last);
    setAttending_ceremony(initialValues.attending_ceremony);
    setAttending_brunch(initialValues.attending_brunch);
    setAttending_rehearsal(initialValues.attending_rehearsal);
    setAttending_happy_hour(initialValues.attending_happy_hour);
    setErrors({});
  };
  const validations = {
    first: [],
    last: [],
    attending_ceremony: [],
    attending_brunch: [],
    attending_rehearsal: [],
    attending_happy_hour: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          first,
          last,
          attending_ceremony,
          attending_brunch,
          attending_rehearsal,
          attending_happy_hour,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: createGuest.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "GuestCreateForm")}
      {...rest}
    >
      <TextField
        label="First"
        isRequired={false}
        isReadOnly={false}
        value={first}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first: value,
              last,
              attending_ceremony,
              attending_brunch,
              attending_rehearsal,
              attending_happy_hour,
            };
            const result = onChange(modelFields);
            value = result?.first ?? value;
          }
          if (errors.first?.hasError) {
            runValidationTasks("first", value);
          }
          setFirst(value);
        }}
        onBlur={() => runValidationTasks("first", first)}
        errorMessage={errors.first?.errorMessage}
        hasError={errors.first?.hasError}
        {...getOverrideProps(overrides, "first")}
      ></TextField>
      <TextField
        label="Last"
        isRequired={false}
        isReadOnly={false}
        value={last}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              first,
              last: value,
              attending_ceremony,
              attending_brunch,
              attending_rehearsal,
              attending_happy_hour,
            };
            const result = onChange(modelFields);
            value = result?.last ?? value;
          }
          if (errors.last?.hasError) {
            runValidationTasks("last", value);
          }
          setLast(value);
        }}
        onBlur={() => runValidationTasks("last", last)}
        errorMessage={errors.last?.errorMessage}
        hasError={errors.last?.hasError}
        {...getOverrideProps(overrides, "last")}
      ></TextField>
      <TextField
        label="Attending ceremony"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={attending_ceremony}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              first,
              last,
              attending_ceremony: value,
              attending_brunch,
              attending_rehearsal,
              attending_happy_hour,
            };
            const result = onChange(modelFields);
            value = result?.attending_ceremony ?? value;
          }
          if (errors.attending_ceremony?.hasError) {
            runValidationTasks("attending_ceremony", value);
          }
          setAttending_ceremony(value);
        }}
        onBlur={() =>
          runValidationTasks("attending_ceremony", attending_ceremony)
        }
        errorMessage={errors.attending_ceremony?.errorMessage}
        hasError={errors.attending_ceremony?.hasError}
        {...getOverrideProps(overrides, "attending_ceremony")}
      ></TextField>
      <SwitchField
        label="Attending brunch"
        defaultChecked={false}
        isDisabled={false}
        isChecked={attending_brunch}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              first,
              last,
              attending_ceremony,
              attending_brunch: value,
              attending_rehearsal,
              attending_happy_hour,
            };
            const result = onChange(modelFields);
            value = result?.attending_brunch ?? value;
          }
          if (errors.attending_brunch?.hasError) {
            runValidationTasks("attending_brunch", value);
          }
          setAttending_brunch(value);
        }}
        onBlur={() => runValidationTasks("attending_brunch", attending_brunch)}
        errorMessage={errors.attending_brunch?.errorMessage}
        hasError={errors.attending_brunch?.hasError}
        {...getOverrideProps(overrides, "attending_brunch")}
      ></SwitchField>
      <SwitchField
        label="Attending rehearsal"
        defaultChecked={false}
        isDisabled={false}
        isChecked={attending_rehearsal}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              first,
              last,
              attending_ceremony,
              attending_brunch,
              attending_rehearsal: value,
              attending_happy_hour,
            };
            const result = onChange(modelFields);
            value = result?.attending_rehearsal ?? value;
          }
          if (errors.attending_rehearsal?.hasError) {
            runValidationTasks("attending_rehearsal", value);
          }
          setAttending_rehearsal(value);
        }}
        onBlur={() =>
          runValidationTasks("attending_rehearsal", attending_rehearsal)
        }
        errorMessage={errors.attending_rehearsal?.errorMessage}
        hasError={errors.attending_rehearsal?.hasError}
        {...getOverrideProps(overrides, "attending_rehearsal")}
      ></SwitchField>
      <SwitchField
        label="Attending happy hour"
        defaultChecked={false}
        isDisabled={false}
        isChecked={attending_happy_hour}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              first,
              last,
              attending_ceremony,
              attending_brunch,
              attending_rehearsal,
              attending_happy_hour: value,
            };
            const result = onChange(modelFields);
            value = result?.attending_happy_hour ?? value;
          }
          if (errors.attending_happy_hour?.hasError) {
            runValidationTasks("attending_happy_hour", value);
          }
          setAttending_happy_hour(value);
        }}
        onBlur={() =>
          runValidationTasks("attending_happy_hour", attending_happy_hour)
        }
        errorMessage={errors.attending_happy_hour?.errorMessage}
        hasError={errors.attending_happy_hour?.hasError}
        {...getOverrideProps(overrides, "attending_happy_hour")}
      ></SwitchField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
