
import axios from 'axios';

export interface University {
  name: string;
  country: string;
  alpha_two_code: string;
  web_pages: string[];
  domains: string[];
  state_province: string | null;
}

export interface SearchParams {
  name: string;
  page: number;
  limit: number;
}

const BASE_URL = 'https://universities.hipolabs.com/search';

export const searchUniversities = async ({ name, page, limit }: SearchParams): Promise<{
  universities: University[];
  total: number;
}> => {
  try {
    const response = await axios.get(BASE_URL, {
      params: { name }
    });
    
    const allResults = response.data as University[]; 
    const total = allResults.length; 
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = allResults.slice(startIndex, endIndex);
    
    return {
      universities: paginatedResults,
      total
    };
  } catch (error) {
    console.error('Error fetching universities:', error);
    throw new Error('error');
  }
};
