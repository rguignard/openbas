import * as R from 'ramda';
import countries from '../resources/geo/countries.json';
import { Exercise, Organization, Tag } from './api-types';

export interface Option {
  id: string
  label: string
  color?: string
}

export const tagOptions = (tag_ids: string[] | undefined, tagsMap: Record<string, Tag>) => (tag_ids ?? [])
  .map((tagId) => tagsMap[tagId])
  .filter((tagItem) => tagItem !== undefined)
  .map((tagItem) => ({
    id: tagItem.tag_id,
    label: tagItem.tag_name,
    color: tagItem.tag_color,
  } as Option));

export const exerciseOptions = (exercise_ids: string[], exercisesMap: Record<string, Exercise>) => (exercise_ids ?? [])
  .map((exerciseId) => exercisesMap[exerciseId])
  .filter((exerciseItem) => exerciseItem !== undefined)
  .map((exerciseItem) => ({
    id: exerciseItem.exercise_id,
    label: exerciseItem.exercise_name,
  } as Option));

export const organizationOption = (organizationId: string | undefined, organizationsMap: Record<string, Organization>) => {
  if (!organizationId) {
    return undefined;
  }
  const value = organizationsMap[organizationId];
  return value
    ? {
      id: value.organization_id,
      label: value.organization_name,
    } as Option
    : undefined;
};

export const countryOptions = () => countries.features.map((n) => ({
  id: n.properties.ISO3,
  label: n.properties.NAME,
} as Option));

export const countryOption = (iso3: string | undefined) => {
  if (!iso3) {
    return undefined;
  }
  const country = R.head(
    countries.features.filter((n) => n.properties.ISO3 === iso3),
  );
  return { id: country.properties.ISO3, label: country.properties.NAME } as Option;
};