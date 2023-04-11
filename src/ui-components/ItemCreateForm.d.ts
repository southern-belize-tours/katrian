/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ItemCreateFormInputValues = {
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
export declare type ItemCreateFormValidationValues = {
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
export declare type ItemCreateFormOverridesProps = {
    ItemCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type ItemCreateFormProps = React.PropsWithChildren<{
    overrides?: ItemCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ItemCreateFormInputValues) => ItemCreateFormInputValues;
    onSuccess?: (fields: ItemCreateFormInputValues) => void;
    onError?: (fields: ItemCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ItemCreateFormInputValues) => ItemCreateFormInputValues;
    onValidate?: ItemCreateFormValidationValues;
} & React.CSSProperties>;
export default function ItemCreateForm(props: ItemCreateFormProps): React.ReactElement;
