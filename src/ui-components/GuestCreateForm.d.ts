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
export declare type GuestCreateFormInputValues = {
    first?: string;
    last?: string;
    attending_ceremony?: boolean;
    attending_brunch?: boolean;
    attending_rehearsal?: boolean;
    attending_happy_hour?: boolean;
};
export declare type GuestCreateFormValidationValues = {
    first?: ValidationFunction<string>;
    last?: ValidationFunction<string>;
    attending_ceremony?: ValidationFunction<boolean>;
    attending_brunch?: ValidationFunction<boolean>;
    attending_rehearsal?: ValidationFunction<boolean>;
    attending_happy_hour?: ValidationFunction<boolean>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type GuestCreateFormOverridesProps = {
    GuestCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    first?: PrimitiveOverrideProps<TextFieldProps>;
    last?: PrimitiveOverrideProps<TextFieldProps>;
    attending_ceremony?: PrimitiveOverrideProps<SwitchFieldProps>;
    attending_brunch?: PrimitiveOverrideProps<SwitchFieldProps>;
    attending_rehearsal?: PrimitiveOverrideProps<SwitchFieldProps>;
    attending_happy_hour?: PrimitiveOverrideProps<SwitchFieldProps>;
} & EscapeHatchProps;
export declare type GuestCreateFormProps = React.PropsWithChildren<{
    overrides?: GuestCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: GuestCreateFormInputValues) => GuestCreateFormInputValues;
    onSuccess?: (fields: GuestCreateFormInputValues) => void;
    onError?: (fields: GuestCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: GuestCreateFormInputValues) => GuestCreateFormInputValues;
    onValidate?: GuestCreateFormValidationValues;
} & React.CSSProperties>;
export default function GuestCreateForm(props: GuestCreateFormProps): React.ReactElement;
