import axios from 'axios';

const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');

export const courseApi = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

function getStoredAccessToken() {
  if (typeof window === 'undefined') {
    return null;
  }

  const candidateKeys = ['access_token', 'token', 'authToken'];

  for (const key of candidateKeys) {
    const localValue = window.localStorage.getItem(key);
    if (localValue) {
      return localValue;
    }

    const sessionValue = window.sessionStorage.getItem(key);
    if (sessionValue) {
      return sessionValue;
    }
  }

  return null;
}

courseApi.interceptors.request.use((config) => {
  const token = getStoredAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export type UploadUrlResponse = {
  uploadUrl: string;
  fileUrl: string;
};

export type RequestUploadUrlInput = {
  fileName: string;
  fileType: string;
  courseId: string;
};

export async function requestUploadUrl(payload: RequestUploadUrlInput) {
  const response = await courseApi.post<UploadUrlResponse>('/api/uploads/get-upload-url', payload);
  return response.data;
}

export type SaveScormCoursePayload = {
  courseId: string;
  courseInfo: {
    title: string;
    subtitle: string;
    description: string;
    category: string;
    level: string;
    language: string;
    estimatedHours: string;
  };
  settings: {
    navigationMode: 'linear' | 'free';
    passScore: number;
    allowRetakes: boolean;
    trackTimeSpent: boolean;
  };
  metadata: {
    identifier: string;
    version: string;
    author: string;
    keywords: string;
    notes: string;
  };
  chapters: Array<{
    order: number;
    title: string;
    description: string;
    durationMinutes: number;
    assets: Array<{
      contentType: 'video' | 'slides' | 'pdf' | 'images';
      fileName: string;
      fileType: string;
      fileSize: number;
      fileUrl: string;
      uploadedAt: string;
    }>;
    questions: Array<{
      prompt: string;
      explanation: string;
      options: string[];
      correctOptionId: string;
    }>;
  }>;
};

export type SaveCourseMetadataPayload = Pick<
  SaveScormCoursePayload,
  'courseId' | 'courseInfo' | 'settings' | 'metadata'
>;

export async function saveCourseMetadata(payload: SaveCourseMetadataPayload) {
  const response = await courseApi.post('/api/courses/metadata', payload);
  return response.data;
}

export async function saveScormCourse(payload: SaveScormCoursePayload) {
  const response = await courseApi.post('/api/courses/scorm-drafts', payload);
  return response.data;
}
