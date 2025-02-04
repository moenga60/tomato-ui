import { useMutation, useQuery } from 'react-query';
import { grading } from '../lib/api';

export const useGradeImage = () => {
  return useMutation((imageId: number) => grading.gradeImage(imageId));
};

export const useUploadImage = () => {
  return useMutation((formData: FormData) => grading.uploadImage(formData));
};

export const useGradingResults = (imageId: number) => {
  return useQuery(
    ['gradingResults', imageId],
    () => grading.getResults(imageId),
    {
      enabled: !!imageId,
    }
  );
};