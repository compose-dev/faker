import * as primitives from "./primitives";

interface BaseField {
  type: string;
  key: string;
}

interface PersonNameField extends BaseField {
  type: "person_name";
}

interface CompanyNameField extends BaseField {
  type: "company_name";
}

interface IntField extends BaseField {
  type: "int";
  min: number;
  max: number;
}

interface FloatField extends BaseField {
  type: "float";
  min: number;
  max: number;
  decimals: number;
}

interface EmailField extends BaseField {
  type: "email";
}

interface FeatureFlagsField extends BaseField {
  type: "feature_flags";
  count: number;
}

type Field =
  | PersonNameField
  | CompanyNameField
  | IntField
  | FloatField
  | EmailField
  | FeatureFlagsField;

type ReturnType<T extends Field[]> = {
  [K in T[number]["key"]]: T[number]["type"] extends
    | "person_name"
    | "company_name"
    | "email"
    ? string
    : T[number]["type"] extends "int" | "float"
      ? number
      : T[number]["type"] extends "feature_flags"
        ? Record<string, boolean | number | string>
        : never;
};

function generateRecord<T extends Field[]>(fields: T): ReturnType<T> {
  const row: Record<string, any> = {};

  const personName = primitives.personName();

  for (const field of fields) {
    switch (field.type) {
      case "person_name":
        row[field.key] = personName.full;
        break;
      case "int":
        row[field.key] = primitives.int(field.min, field.max);
        break;
      case "float":
        row[field.key] = primitives.float(field.min, field.max, field.decimals);
        break;
      case "email":
        row[field.key] = primitives.email(personName);
        break;
      case "feature_flags":
        row[field.key] = primitives.featureFlags(field.count);
        break;
    }
  }

  return row as ReturnType<T>;
}

function generateRecords<T extends Field[]>(fields: T, count: number) {
  const rows: ReturnType<T>[] = [];

  for (let i = 0; i < count; i++) {
    rows.push(generateRecord(fields));
  }

  return rows;
}

export { generateRecord as record, generateRecords as records };
