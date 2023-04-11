/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Item } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ItemUpdateFormInputValues = {
    itemName?: string;
    itemImageUrl?: string;
    itemPrice?: number;
    itemQuantity?: number;
    itemLink?: string;
    itemStatus?: string;
    guestName?: string;
    guestMessage?: string;
    itemTimestam?: string;
};
export declare type ItemUpdateFormValidationValues = {
    itemName?: ValidationFunction<string>;
    itemImageUrl?: ValidationFunction<string>;
    itemPrice?: ValidationFunction<number>;
    itemQuantity?: ValidationFunction<number>;
    itemLink?: ValidationFunction<string>;
    itemStatus?: ValidationFunction<string>;
    guestName?: ValidationFunction<string>;
    guestMessage?: ValidationFunction<string>;
    itemTimestam?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ItemUpdateFormOverridesProps = {
    ItemUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    itemName?: PrimitiveOverrideProps<TextFieldProps>;
    itemImageUrl?: PrimitiveOverrideProps<TextFieldProps>;
    itemPrice?: PrimitiveOverrideProps<TextFieldProps>;
    itemQuantity?: PrimitiveOverrideProps<TextFieldProps>;
    itemLink?: PrimitiveOverrideProps<TextFieldProps>;
    itemStatus?: PrimitiveOverrideProps<TextFieldProps>;
    guestName?: PrimitiveOverrideProps<TextFieldProps>;
    guestMessage?: PrimitiveOverrideProps<TextFieldProps>;
    itemTimestam?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ItemUpdateFormProps = React.PropsWithChildren<{
    overrides?: ItemUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    item?: Item;
    onSubmit?: (fields: ItemUpdateFormInputValues) => ItemUpdateFormInputValues;
    onSuccess?: (fields: ItemUpdateFormInputValues) => void;
    onError?: (fields: ItemUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ItemUpdateFormInputValues) => ItemUpdateFormInputValues;
    onValidate?: ItemUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ItemUpdateForm(props: ItemUpdateFormProps): React.ReactElement;
