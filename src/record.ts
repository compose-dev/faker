import * as primitives from "./primitives";

interface BaseDefinition {
  type: string;
}

const TYPES = {
  personName: "personName",
  companyName: "companyName",
  int: "int",
  float: "float",
  email: "email",
  featureFlags: "featureFlags",
} as const;

type Type = (typeof TYPES)[keyof typeof TYPES];

interface PersonNameDefinition extends BaseDefinition {
  type: typeof TYPES.personName;
}

interface CompanyNameDefinition extends BaseDefinition {
  type: typeof TYPES.companyName;
}

interface IntDefinition extends BaseDefinition {
  type: typeof TYPES.int;
  min: number;
  max: number;
}

interface FloatDefinition extends BaseDefinition {
  type: typeof TYPES.float;
  min: number;
  max: number;
  decimals: number;
}

interface EmailDefinition extends BaseDefinition {
  type: typeof TYPES.email;
}

interface FeatureFlagsDefinition extends BaseDefinition {
  type: typeof TYPES.featureFlags;
  count: number;
}

type FieldDefinition =
  | PersonNameDefinition
  | CompanyNameDefinition
  | IntDefinition
  | FloatDefinition
  | EmailDefinition
  | FeatureFlagsDefinition
  | Type;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

type ReturnType<T extends Record<string, FieldDefinition | string>> = {
  [K in keyof T]: T[K] extends FieldDefinition
    ? T[K] extends { type: typeof TYPES.personName } | typeof TYPES.personName
      ? string
      : T[K] extends
            | { type: typeof TYPES.companyName }
            | typeof TYPES.companyName
        ? string
        : T[K] extends { type: typeof TYPES.int } | typeof TYPES.int
          ? number
          : T[K] extends { type: typeof TYPES.float } | typeof TYPES.float
            ? number
            : T[K] extends { type: typeof TYPES.email } | typeof TYPES.email
              ? string
              : T[K] extends
                    | { type: typeof TYPES.featureFlags }
                    | typeof TYPES.featureFlags
                ? Record<string, string | number | boolean>
                : never
    : T[K] extends string
      ? string
      : never;
};

function generateRecord<T extends Record<string, FieldDefinition>>(
  fields: T
): Prettify<ReturnType<T>> {
  const row: Record<string, any> = {};

  const personName = primitives.personName();

  for (const [key, field] of Object.entries(fields)) {
    const object: Record<string, any> =
      "type" in (field as any) ? (field as any) : { type: field };

    if (object.type === TYPES.personName) {
      row[key] = personName.full;
    } else if (object.type === TYPES.companyName) {
      row[key] = primitives.companyName();
    } else if (object.type === TYPES.int) {
      row[key] = primitives.int(object.min, object.max);
    } else if (object.type === TYPES.float) {
      row[key] = primitives.float(object.min, object.max, object.decimals);
    } else if (object.type === TYPES.email) {
      row[key] = primitives.email(personName);
    } else if (object.type === TYPES.featureFlags) {
      row[key] = primitives.featureFlags(object.count);
    } else {
      throw new Error(`Unknown field type: ${object.type}`);
    }
  }

  return row as ReturnType<T>;
}

function generateRecords<T extends Record<string, FieldDefinition>>(
  fields: T,
  count: number
) {
  const rows: ReturnType<T>[] = [];

  for (let i = 0; i < count; i++) {
    rows.push(generateRecord(fields));
  }

  return rows;
}

export { generateRecord as record, generateRecords as records };
