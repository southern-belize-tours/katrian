/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SwitchField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { createGroup } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function GroupCreateForm(props) {
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
    title: "",
    invited_rehearsal: false,
    address: "",
    city: "",
    state: "",
    email: "",
    Guest_ids: [],
    zip: "",
    invited_happy_hour: "",
    phone: "",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [invited_rehearsal, setInvited_rehearsal] = React.useState(
    initialValues.invited_rehearsal
  );
  const [address, setAddress] = React.useState(initialValues.address);
  const [city, setCity] = React.useState(initialValues.city);
  const [state, setState] = React.useState(initialValues.state);
  const [email, setEmail] = React.useState(initialValues.email);
  const [Guest_ids, setGuest_ids] = React.useState(initialValues.Guest_ids);
  const [zip, setZip] = React.useState(initialValues.zip);
  const [invited_happy_hour, setInvited_happy_hour] = React.useState(
    initialValues.invited_happy_hour
  );
  const [phone, setPhone] = React.useState(initialValues.phone);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setInvited_rehearsal(initialValues.invited_rehearsal);
    setAddress(initialValues.address);
    setCity(initialValues.city);
    setState(initialValues.state);
    setEmail(initialValues.email);
    setGuest_ids(initialValues.Guest_ids);
    setCurrentGuest_idsValue("");
    setZip(initialValues.zip);
    setInvited_happy_hour(initialValues.invited_happy_hour);
    setPhone(initialValues.phone);
    setErrors({});
  };
  const [currentGuest_idsValue, setCurrentGuest_idsValue] = React.useState("");
  const Guest_idsRef = React.createRef();
  const validations = {
    title: [],
    invited_rehearsal: [],
    address: [],
    city: [],
    state: [],
    email: [],
    Guest_ids: [],
    zip: [],
    invited_happy_hour: [],
    phone: [],
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
          title,
          invited_rehearsal,
          address,
          city,
          state,
          email,
          Guest_ids,
          zip,
          invited_happy_hour,
          phone,
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
            query: createGroup.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "GroupCreateForm")}
      {...rest}
    >
      <TextField
        label="Title"
        isRequired={false}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title: value,
              invited_rehearsal,
              address,
              city,
              state,
              email,
              Guest_ids,
              zip,
              invited_happy_hour,
              phone,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <SwitchField
        label="Invited rehearsal"
        defaultChecked={false}
        isDisabled={false}
        isChecked={invited_rehearsal}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              title,
              invited_rehearsal: value,
              address,
              city,
              state,
              email,
              Guest_ids,
              zip,
              invited_happy_hour,
              phone,
            };
            const result = onChange(modelFields);
            value = result?.invited_rehearsal ?? value;
          }
          if (errors.invited_rehearsal?.hasError) {
            runValidationTasks("invited_rehearsal", value);
          }
          setInvited_rehearsal(value);
        }}
        onBlur={() =>
          runValidationTasks("invited_rehearsal", invited_rehearsal)
        }
        errorMessage={errors.invited_rehearsal?.errorMessage}
        hasError={errors.invited_rehearsal?.hasError}
        {...getOverrideProps(overrides, "invited_rehearsal")}
      ></SwitchField>
      <TextField
        label="Address"
        isRequired={false}
        isReadOnly={false}
        value={address}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              invited_rehearsal,
              address: value,
              city,
              state,
              email,
              Guest_ids,
              zip,
              invited_happy_hour,
              phone,
            };
            const result = onChange(modelFields);
            value = result?.address ?? value;
          }
          if (errors.address?.hasError) {
            runValidationTasks("address", value);
          }
          setAddress(value);
        }}
        onBlur={() => runValidationTasks("address", address)}
        errorMessage={errors.address?.errorMessage}
        hasError={errors.address?.hasError}
        {...getOverrideProps(overrides, "address")}
      ></TextField>
      <TextField
        label="City"
        isRequired={false}
        isReadOnly={false}
        value={city}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              invited_rehearsal,
              address,
              city: value,
              state,
              email,
              Guest_ids,
              zip,
              invited_happy_hour,
              phone,
            };
            const result = onChange(modelFields);
            value = result?.city ?? value;
          }
          if (errors.city?.hasError) {
            runValidationTasks("city", value);
          }
          setCity(value);
        }}
        onBlur={() => runValidationTasks("city", city)}
        errorMessage={errors.city?.errorMessage}
        hasError={errors.city?.hasError}
        {...getOverrideProps(overrides, "city")}
      ></TextField>
      <TextField
        label="State"
        isRequired={false}
        isReadOnly={false}
        value={state}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              invited_rehearsal,
              address,
              city,
              state: value,
              email,
              Guest_ids,
              zip,
              invited_happy_hour,
              phone,
            };
            const result = onChange(modelFields);
            value = result?.state ?? value;
          }
          if (errors.state?.hasError) {
            runValidationTasks("state", value);
          }
          setState(value);
        }}
        onBlur={() => runValidationTasks("state", state)}
        errorMessage={errors.state?.errorMessage}
        hasError={errors.state?.hasError}
        {...getOverrideProps(overrides, "state")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={false}
        isReadOnly={false}
        value={email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              invited_rehearsal,
              address,
              city,
              state,
              email: value,
              Guest_ids,
              zip,
              invited_happy_hour,
              phone,
            };
            const result = onChange(modelFields);
            value = result?.email ?? value;
          }
          if (errors.email?.hasError) {
            runValidationTasks("email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("email", email)}
        errorMessage={errors.email?.errorMessage}
        hasError={errors.email?.hasError}
        {...getOverrideProps(overrides, "email")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              title,
              invited_rehearsal,
              address,
              city,
              state,
              email,
              Guest_ids: values,
              zip,
              invited_happy_hour,
              phone,
            };
            const result = onChange(modelFields);
            values = result?.Guest_ids ?? values;
          }
          setGuest_ids(values);
          setCurrentGuest_idsValue("");
        }}
        currentFieldValue={currentGuest_idsValue}
        label={"Guest ids"}
        items={Guest_ids}
        hasError={errors?.Guest_ids?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("Guest_ids", currentGuest_idsValue)
        }
        errorMessage={errors?.Guest_ids?.errorMessage}
        setFieldValue={setCurrentGuest_idsValue}
        inputFieldRef={Guest_idsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Guest ids"
          isRequired={false}
          isReadOnly={false}
          value={currentGuest_idsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.Guest_ids?.hasError) {
              runValidationTasks("Guest_ids", value);
            }
            setCurrentGuest_idsValue(value);
          }}
          onBlur={() => runValidationTasks("Guest_ids", currentGuest_idsValue)}
          errorMessage={errors.Guest_ids?.errorMessage}
          hasError={errors.Guest_ids?.hasError}
          ref={Guest_idsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "Guest_ids")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Zip"
        isRequired={false}
        isReadOnly={false}
        value={zip}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              invited_rehearsal,
              address,
              city,
              state,
              email,
              Guest_ids,
              zip: value,
              invited_happy_hour,
              phone,
            };
            const result = onChange(modelFields);
            value = result?.zip ?? value;
          }
          if (errors.zip?.hasError) {
            runValidationTasks("zip", value);
          }
          setZip(value);
        }}
        onBlur={() => runValidationTasks("zip", zip)}
        errorMessage={errors.zip?.errorMessage}
        hasError={errors.zip?.hasError}
        {...getOverrideProps(overrides, "zip")}
      ></TextField>
      <TextField
        label="Invited happy hour"
        isRequired={false}
        isReadOnly={false}
        value={invited_happy_hour}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              invited_rehearsal,
              address,
              city,
              state,
              email,
              Guest_ids,
              zip,
              invited_happy_hour: value,
              phone,
            };
            const result = onChange(modelFields);
            value = result?.invited_happy_hour ?? value;
          }
          if (errors.invited_happy_hour?.hasError) {
            runValidationTasks("invited_happy_hour", value);
          }
          setInvited_happy_hour(value);
        }}
        onBlur={() =>
          runValidationTasks("invited_happy_hour", invited_happy_hour)
        }
        errorMessage={errors.invited_happy_hour?.errorMessage}
        hasError={errors.invited_happy_hour?.hasError}
        {...getOverrideProps(overrides, "invited_happy_hour")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        value={phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              invited_rehearsal,
              address,
              city,
              state,
              email,
              Guest_ids,
              zip,
              invited_happy_hour,
              phone: value,
            };
            const result = onChange(modelFields);
            value = result?.phone ?? value;
          }
          if (errors.phone?.hasError) {
            runValidationTasks("phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("phone", phone)}
        errorMessage={errors.phone?.errorMessage}
        hasError={errors.phone?.hasError}
        {...getOverrideProps(overrides, "phone")}
      ></TextField>
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
