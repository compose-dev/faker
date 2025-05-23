import * as helpers from "../helpers";

interface BaseDefinition {
  type: string;
}

const TYPE = {
  // String types
  personName: "personName",
  personFirstName: "personFirstName",
  personLastName: "personLastName",
  companyName: "companyName",
  email: "email",
  uuid: "uuid",

  // Number types
  int: "int",
  float: "float",

  // Boolean types
  boolean: "boolean",

  // Date types
  date: "date",

  // Other types
  featureFlags: "featureFlags",
  tier: "tier",
} as const;

type StringType =
  | typeof TYPE.personName
  | typeof TYPE.personFirstName
  | typeof TYPE.personLastName
  | typeof TYPE.companyName
  | typeof TYPE.email
  | typeof TYPE.uuid;

type NumberType = typeof TYPE.int | typeof TYPE.float;

type DateType = typeof TYPE.date;

type BooleanType = typeof TYPE.boolean;

type Type = (typeof TYPE)[keyof typeof TYPE];

interface PersonNameDefinition extends BaseDefinition {
  type: typeof TYPE.personName;
}

interface PersonFirstNameDefinition extends BaseDefinition {
  type: typeof TYPE.personFirstName;
}

interface PersonLastNameDefinition extends BaseDefinition {
  type: typeof TYPE.personLastName;
}

interface CompanyNameDefinition extends BaseDefinition {
  type: typeof TYPE.companyName;
}

interface IntDefinition extends BaseDefinition {
  type: typeof TYPE.int;
  min: number;
  max: number;
}

interface FloatDefinition extends BaseDefinition {
  type: typeof TYPE.float;
  min: number;
  max: number;
  decimals: number;
}

interface EmailDefinition extends BaseDefinition {
  type: typeof TYPE.email;
}

interface FeatureFlagsDefinition extends BaseDefinition {
  type: typeof TYPE.featureFlags;
  count: number;
}

interface UUIDDefinition extends BaseDefinition {
  type: typeof TYPE.uuid;
}

interface BooleanDefinition extends BaseDefinition {
  type: typeof TYPE.boolean;
  trueChance: number;
}

interface TierDefinition extends BaseDefinition {
  type: typeof TYPE.tier;
}

interface DateDefinition extends BaseDefinition {
  type: typeof TYPE.date;
  min: Date;
  max: Date;
}

type FieldDefinition =
  | PersonNameDefinition
  | PersonFirstNameDefinition
  | PersonLastNameDefinition
  | CompanyNameDefinition
  | IntDefinition
  | FloatDefinition
  | EmailDefinition
  | FeatureFlagsDefinition
  | UUIDDefinition
  | BooleanDefinition
  | TierDefinition
  | DateDefinition
  | Type;

const FALLBACKS = {
  minInt: 0,
  maxInt: 100,
  minFloat: 0,
  maxFloat: 100,
  floatDecimals: 2,
  minDate: new Date(), // Today
  maxDate: helpers.date.addDays(new Date(), 30),
  trueChance: 0.5,
  featureFlagsCount: 5,
} as const;

export { TYPE, FALLBACKS };
export type {
  FieldDefinition,
  Type,
  StringType,
  NumberType,
  DateType,
  BooleanType,
};
