/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Item } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ItemUpdateForm(props) {
  const {
    id: idProp,
    item: itemModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    itemName: "",
    itemImageUrl: "",
    itemPrice: "",
    itemQuantity: "",
    itemLink: "",
    itemStatus: "",
    guestName: "",
    guestMessage: "",
    itemTimestam: "",
  };
  const [itemName, setItemName] = React.useState(initialValues.itemName);
  const [itemImageUrl, setItemImageUrl] = React.useState(
    initialValues.itemImageUrl
  );
  const [itemPrice, setItemPrice] = React.useState(initialValues.itemPrice);
  const [itemQuantity, setItemQuantity] = React.useState(
    initialValues.itemQuantity
  );
  const [itemLink, setItemLink] = React.useState(initialValues.itemLink);
  const [itemStatus, setItemStatus] = React.useState(initialValues.itemStatus);
  const [guestName, setGuestName] = React.useState(initialValues.guestName);
  const [guestMessage, setGuestMessage] = React.useState(
    initialValues.guestMessage
  );
  const [itemTimestam, setItemTimestam] = React.useState(
    initialValues.itemTimestam
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = itemRecord
      ? { ...initialValues, ...itemRecord }
      : initialValues;
    setItemName(cleanValues.itemName);
    setItemImageUrl(cleanValues.itemImageUrl);
    setItemPrice(cleanValues.itemPrice);
    setItemQuantity(cleanValues.itemQuantity);
    setItemLink(cleanValues.itemLink);
    setItemStatus(cleanValues.itemStatus);
    setGuestName(cleanValues.guestName);
    setGuestMessage(cleanValues.guestMessage);
    setItemTimestam(cleanValues.itemTimestam);
    setErrors({});
  };
  const [itemRecord, setItemRecord] = React.useState(itemModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Item, idProp)
        : itemModelProp;
      setItemRecord(record);
    };
    queryData();
  }, [idProp, itemModelProp]);
  React.useEffect(resetStateValues, [itemRecord]);
  const validations = {
    itemName: [{ type: "Required" }],
    itemImageUrl: [],
    itemPrice: [{ type: "Required" }],
    itemQuantity: [{ type: "Required" }],
    itemLink: [{ type: "Required" }],
    itemStatus: [],
    guestName: [],
    guestMessage: [],
    itemTimestam: [],
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
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
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
          itemName,
          itemImageUrl,
          itemPrice,
          itemQuantity,
          itemLink,
          itemStatus,
          guestName,
          guestMessage,
          itemTimestam,
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
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Item.copyOf(itemRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ItemUpdateForm")}
      {...rest}
    >
      <TextField
        label="Item name"
        isRequired={true}
        isReadOnly={false}
        value={itemName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              itemName: value,
              itemImageUrl,
              itemPrice,
              itemQuantity,
              itemLink,
              itemStatus,
              guestName,
              guestMessage,
              itemTimestam,
            };
            const result = onChange(modelFields);
            value = result?.itemName ?? value;
          }
          if (errors.itemName?.hasError) {
            runValidationTasks("itemName", value);
          }
          setItemName(value);
        }}
        onBlur={() => runValidationTasks("itemName", itemName)}
        errorMessage={errors.itemName?.errorMessage}
        hasError={errors.itemName?.hasError}
        {...getOverrideProps(overrides, "itemName")}
      ></TextField>
      <TextField
        label="Item image url"
        isRequired={false}
        isReadOnly={false}
        value={itemImageUrl}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              itemName,
              itemImageUrl: value,
              itemPrice,
              itemQuantity,
              itemLink,
              itemStatus,
              guestName,
              guestMessage,
              itemTimestam,
            };
            const result = onChange(modelFields);
            value = result?.itemImageUrl ?? value;
          }
          if (errors.itemImageUrl?.hasError) {
            runValidationTasks("itemImageUrl", value);
          }
          setItemImageUrl(value);
        }}
        onBlur={() => runValidationTasks("itemImageUrl", itemImageUrl)}
        errorMessage={errors.itemImageUrl?.errorMessage}
        hasError={errors.itemImageUrl?.hasError}
        {...getOverrideProps(overrides, "itemImageUrl")}
      ></TextField>
      <TextField
        label="Item price"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={itemPrice}
        onChange={(e) => {
          let value = isNaN(parseFloat(e.target.value))
            ? e.target.value
            : parseFloat(e.target.value);
          if (onChange) {
            const modelFields = {
              itemName,
              itemImageUrl,
              itemPrice: value,
              itemQuantity,
              itemLink,
              itemStatus,
              guestName,
              guestMessage,
              itemTimestam,
            };
            const result = onChange(modelFields);
            value = result?.itemPrice ?? value;
          }
          if (errors.itemPrice?.hasError) {
            runValidationTasks("itemPrice", value);
          }
          setItemPrice(value);
        }}
        onBlur={() => runValidationTasks("itemPrice", itemPrice)}
        errorMessage={errors.itemPrice?.errorMessage}
        hasError={errors.itemPrice?.hasError}
        {...getOverrideProps(overrides, "itemPrice")}
      ></TextField>
      <TextField
        label="Item quantity"
        isRequired={true}
        isReadOnly={false}
        type="number"
        step="any"
        value={itemQuantity}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              itemName,
              itemImageUrl,
              itemPrice,
              itemQuantity: value,
              itemLink,
              itemStatus,
              guestName,
              guestMessage,
              itemTimestam,
            };
            const result = onChange(modelFields);
            value = result?.itemQuantity ?? value;
          }
          if (errors.itemQuantity?.hasError) {
            runValidationTasks("itemQuantity", value);
          }
          setItemQuantity(value);
        }}
        onBlur={() => runValidationTasks("itemQuantity", itemQuantity)}
        errorMessage={errors.itemQuantity?.errorMessage}
        hasError={errors.itemQuantity?.hasError}
        {...getOverrideProps(overrides, "itemQuantity")}
      ></TextField>
      <TextField
        label="Item link"
        isRequired={true}
        isReadOnly={false}
        value={itemLink}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              itemName,
              itemImageUrl,
              itemPrice,
              itemQuantity,
              itemLink: value,
              itemStatus,
              guestName,
              guestMessage,
              itemTimestam,
            };
            const result = onChange(modelFields);
            value = result?.itemLink ?? value;
          }
          if (errors.itemLink?.hasError) {
            runValidationTasks("itemLink", value);
          }
          setItemLink(value);
        }}
        onBlur={() => runValidationTasks("itemLink", itemLink)}
        errorMessage={errors.itemLink?.errorMessage}
        hasError={errors.itemLink?.hasError}
        {...getOverrideProps(overrides, "itemLink")}
      ></TextField>
      <TextField
        label="Item status"
        isRequired={false}
        isReadOnly={false}
        value={itemStatus}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              itemName,
              itemImageUrl,
              itemPrice,
              itemQuantity,
              itemLink,
              itemStatus: value,
              guestName,
              guestMessage,
              itemTimestam,
            };
            const result = onChange(modelFields);
            value = result?.itemStatus ?? value;
          }
          if (errors.itemStatus?.hasError) {
            runValidationTasks("itemStatus", value);
          }
          setItemStatus(value);
        }}
        onBlur={() => runValidationTasks("itemStatus", itemStatus)}
        errorMessage={errors.itemStatus?.errorMessage}
        hasError={errors.itemStatus?.hasError}
        {...getOverrideProps(overrides, "itemStatus")}
      ></TextField>
      <TextField
        label="Guest name"
        isRequired={false}
        isReadOnly={false}
        value={guestName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              itemName,
              itemImageUrl,
              itemPrice,
              itemQuantity,
              itemLink,
              itemStatus,
              guestName: value,
              guestMessage,
              itemTimestam,
            };
            const result = onChange(modelFields);
            value = result?.guestName ?? value;
          }
          if (errors.guestName?.hasError) {
            runValidationTasks("guestName", value);
          }
          setGuestName(value);
        }}
        onBlur={() => runValidationTasks("guestName", guestName)}
        errorMessage={errors.guestName?.errorMessage}
        hasError={errors.guestName?.hasError}
        {...getOverrideProps(overrides, "guestName")}
      ></TextField>
      <TextField
        label="Guest message"
        isRequired={false}
        isReadOnly={false}
        value={guestMessage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              itemName,
              itemImageUrl,
              itemPrice,
              itemQuantity,
              itemLink,
              itemStatus,
              guestName,
              guestMessage: value,
              itemTimestam,
            };
            const result = onChange(modelFields);
            value = result?.guestMessage ?? value;
          }
          if (errors.guestMessage?.hasError) {
            runValidationTasks("guestMessage", value);
          }
          setGuestMessage(value);
        }}
        onBlur={() => runValidationTasks("guestMessage", guestMessage)}
        errorMessage={errors.guestMessage?.errorMessage}
        hasError={errors.guestMessage?.hasError}
        {...getOverrideProps(overrides, "guestMessage")}
      ></TextField>
      <TextField
        label="Item timestam"
        isRequired={false}
        isReadOnly={false}
        type="datetime-local"
        value={itemTimestam && convertToLocal(new Date(itemTimestam))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              itemName,
              itemImageUrl,
              itemPrice,
              itemQuantity,
              itemLink,
              itemStatus,
              guestName,
              guestMessage,
              itemTimestam: value,
            };
            const result = onChange(modelFields);
            value = result?.itemTimestam ?? value;
          }
          if (errors.itemTimestam?.hasError) {
            runValidationTasks("itemTimestam", value);
          }
          setItemTimestam(value);
        }}
        onBlur={() => runValidationTasks("itemTimestam", itemTimestam)}
        errorMessage={errors.itemTimestam?.errorMessage}
        hasError={errors.itemTimestam?.hasError}
        {...getOverrideProps(overrides, "itemTimestam")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || itemModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || itemModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
