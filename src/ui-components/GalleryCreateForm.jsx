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
import { createGallery } from "../graphql/mutations";
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
export default function GalleryCreateForm(props) {
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
    name: "",
    long_description: "",
    alts: [],
    directory: "",
    admin_upload_only: false,
  };
  const [name, setName] = React.useState(initialValues.name);
  const [long_description, setLong_description] = React.useState(
    initialValues.long_description
  );
  const [alts, setAlts] = React.useState(initialValues.alts);
  const [directory, setDirectory] = React.useState(initialValues.directory);
  const [admin_upload_only, setAdmin_upload_only] = React.useState(
    initialValues.admin_upload_only
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setName(initialValues.name);
    setLong_description(initialValues.long_description);
    setAlts(initialValues.alts);
    setCurrentAltsValue("");
    setDirectory(initialValues.directory);
    setAdmin_upload_only(initialValues.admin_upload_only);
    setErrors({});
  };
  const [currentAltsValue, setCurrentAltsValue] = React.useState("");
  const altsRef = React.createRef();
  const validations = {
    name: [],
    long_description: [],
    alts: [],
    directory: [],
    admin_upload_only: [],
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
          name,
          long_description,
          alts,
          directory,
          admin_upload_only,
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
            query: createGallery.replaceAll("__typename", ""),
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
      {...getOverrideProps(overrides, "GalleryCreateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name: value,
              long_description,
              alts,
              directory,
              admin_upload_only,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Long description"
        isRequired={false}
        isReadOnly={false}
        value={long_description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              long_description: value,
              alts,
              directory,
              admin_upload_only,
            };
            const result = onChange(modelFields);
            value = result?.long_description ?? value;
          }
          if (errors.long_description?.hasError) {
            runValidationTasks("long_description", value);
          }
          setLong_description(value);
        }}
        onBlur={() => runValidationTasks("long_description", long_description)}
        errorMessage={errors.long_description?.errorMessage}
        hasError={errors.long_description?.hasError}
        {...getOverrideProps(overrides, "long_description")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              name,
              long_description,
              alts: values,
              directory,
              admin_upload_only,
            };
            const result = onChange(modelFields);
            values = result?.alts ?? values;
          }
          setAlts(values);
          setCurrentAltsValue("");
        }}
        currentFieldValue={currentAltsValue}
        label={"Alts"}
        items={alts}
        hasError={errors?.alts?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("alts", currentAltsValue)
        }
        errorMessage={errors?.alts?.errorMessage}
        setFieldValue={setCurrentAltsValue}
        inputFieldRef={altsRef}
        defaultFieldValue={""}
      >
        <TextField
          label="Alts"
          isRequired={false}
          isReadOnly={false}
          value={currentAltsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.alts?.hasError) {
              runValidationTasks("alts", value);
            }
            setCurrentAltsValue(value);
          }}
          onBlur={() => runValidationTasks("alts", currentAltsValue)}
          errorMessage={errors.alts?.errorMessage}
          hasError={errors.alts?.hasError}
          ref={altsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "alts")}
        ></TextField>
      </ArrayField>
      <TextField
        label="Directory"
        isRequired={false}
        isReadOnly={false}
        value={directory}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              name,
              long_description,
              alts,
              directory: value,
              admin_upload_only,
            };
            const result = onChange(modelFields);
            value = result?.directory ?? value;
          }
          if (errors.directory?.hasError) {
            runValidationTasks("directory", value);
          }
          setDirectory(value);
        }}
        onBlur={() => runValidationTasks("directory", directory)}
        errorMessage={errors.directory?.errorMessage}
        hasError={errors.directory?.hasError}
        {...getOverrideProps(overrides, "directory")}
      ></TextField>
      <SwitchField
        label="Admin upload only"
        defaultChecked={false}
        isDisabled={false}
        isChecked={admin_upload_only}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              name,
              long_description,
              alts,
              directory,
              admin_upload_only: value,
            };
            const result = onChange(modelFields);
            value = result?.admin_upload_only ?? value;
          }
          if (errors.admin_upload_only?.hasError) {
            runValidationTasks("admin_upload_only", value);
          }
          setAdmin_upload_only(value);
        }}
        onBlur={() =>
          runValidationTasks("admin_upload_only", admin_upload_only)
        }
        errorMessage={errors.admin_upload_only?.errorMessage}
        hasError={errors.admin_upload_only?.hasError}
        {...getOverrideProps(overrides, "admin_upload_only")}
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
