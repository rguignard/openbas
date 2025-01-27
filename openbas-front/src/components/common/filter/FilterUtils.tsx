import React from 'react';
import * as R from 'ramda';
import type { Filter, FilterGroup, PropertySchemaDTO } from '../../../utils/api-types';

export const emptyFilterGroup: FilterGroup = {
  mode: 'and',
  filters: [],
};

export const buildEmptyFilter = (key: string, operator: Filter['operator']) => {
  return {
    key,
    mode: 'and' as Filter['mode'],
    values: [],
    operator,
  };
};

export const buildFilter = (key: string, values: string[], operator: Filter['operator']) => {
  return {
    key,
    mode: 'and' as Filter['mode'],
    values,
    operator,
  };
};

export const isExistFilter = (filterGroup: FilterGroup, key: string) => {
  return filterGroup.filters?.some((f) => f.key === key);
};

export const isEmptyFilter = (filterGroup: FilterGroup, key: string) => {
  if (R.isEmpty(filterGroup.filters)) {
    return true;
  }
  return !filterGroup.filters?.find((f) => f.key === key) || R.isEmpty(filterGroup.filters?.find((f) => f.key === key)?.values);
};

// -- OPERATOR --

export const convertOperatorToIcon = (operator: Filter['operator']) => {
  switch (operator) {
    case 'eq':
      return <>&nbsp;=</>;
    case 'not_eq':
      return <>&nbsp;&#8800;</>;
    case 'not_contains':
      return <>not contains</>;
    case 'contains':
      return <>contains</>;
    case 'starts_with':
      return <>starts with</>;
    case 'not_starts_with':
      return <>not starts with</>;
    default:
      return null;
  }
};

export const OperatorKeyValues: {
  [key: string]: string;
} = {
  eq: 'Equals',
  not_eq: 'Not equals',
  contains: 'Contains',
  not_contains: 'Not contains',
  starts_with: 'Start with',
  not_starts_with: 'Not start with',
};

export const availableOperators = (propertySchema: PropertySchemaDTO) => {
  if (propertySchema.schema_property_values) {
    return ['eq'];
  }
  if (propertySchema.schema_property_type_array) {
    return ['contains', 'not_contains'];
  }
  return [
    'eq',
    'not_eq',
    'contains',
    'not_contains',
    'starts_with',
    'not_starts_with',
  ];
};
