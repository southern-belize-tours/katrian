/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type GroupUpdateFormInputValues = {
    title?: string;
    invited_rehearsal?: boolean;
    address?: string;
    city?: string;
    state?: string;
    email?: string;
    Guest_ids?: string[];
    zip?: string;
    invited_happy_hour?: boolean;
    phone?: string;
};
export declare type GroupUpdateFormValidationValues = {
    title?: ValidationFunction<string>;
    invited_rehearsal?: ValidationFunction<boolean>;
    address?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
    state?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    Guest_ids?: ValidationFunction<string>;
    zip?: ValidationFunction<string>;
    invited_happy_hour?: ValidationFunction<boolean>;
    phone?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GroupUpdateFormOverridesProps = {
    GroupUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    title?: PrimitiveOverrideProps<TextFieldProps>;
    invited_rehearsal?: PrimitiveOverrideProps<SwitchFieldProps>;
    address?: PrimitiveOverrideProps<TextFieldProps>;
    city?: PrimitiveOverrideProps<TextFieldProps>;
    state?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    Guest_ids?: PrimitiveOverrideProps<TextFieldProps>;
    zip?: PrimitiveOverrideProps<TextFieldProps>;
    invited_happy_hour?: PrimitiveOverrideProps<SwitchFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type GroupUpdateFormProps = React.PropsWithChildren<{
    overrides?: GroupUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    group?: any;
    onSubmit?: (fields: GroupUpdateFormInputValues) => GroupUpdateFormInputValues;
    onSuccess?: (fields: GroupUpdateFormInputValues) => void;
    onError?: (fields: GroupUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GroupUpdateFormInputValues) => GroupUpdateFormInputValues;
    onValidate?: GroupUpdateFormValidationValues;
} & React.CSSProperties>;
export default function GroupUpdateForm(props: GroupUpdateFormProps): React.ReactElement;
