import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";





type EagerFaq = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Faq, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly question?: string | null;
  readonly answer?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyFaq = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Faq, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly question?: string | null;
  readonly answer?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Faq = LazyLoading extends LazyLoadingDisabled ? EagerFaq : LazyFaq

export declare const Faq: (new (init: ModelInit<Faq>) => Faq) & {
  copyOf(source: Faq, mutator: (draft: MutableModel<Faq>) => MutableModel<Faq> | void): Faq;
}