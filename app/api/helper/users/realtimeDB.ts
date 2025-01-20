// Types for better type safety and documentation
export const USER_TYPES = {
    OWNERS: 'owners',
    SITTERS: 'petSitters'
  } as const;
  
  type UserType = typeof USER_TYPES[keyof typeof USER_TYPES];
  
//   interface BaseUserData {
//     regOption: string;
//     nameVal: string;
//     mailVal: string;
//     userImg: string;
//   }
  
//   interface SitterData extends BaseUserData {
//     rateOption: string;
//     rateVal: number;
//     selectedHoods: string[];
//     labelNames: Array<{ label: string }>;
//     uid: string;
//   }
  
  // Centralized data extraction functions
  const extractBaseUserData = (data: any) => ({
    selectedUser: data.find((userData: any) => userData.regOption)?.regOption,
    name: data.find((userData: any) => userData.nameVal)?.nameVal,
    mail: data.find((userData: any) => userData.mailVal)?.mailVal,
    userImage: data.find((userData: any) => userData.userImg)?.userImg,
  });
  
  const extractSitterData = (data: any) => ({
    ...extractBaseUserData(data),
    dailyRateOption: data.find((userData: any) => userData.rateOption)?.rateOption,
    dailyRate: data.find((userData: any) => userData.rateVal)?.rateVal,
    selectedHoods: data.find((userData: any) => userData.selectedHoods)?.selectedHoods || [],
    selectedServices: data.find((userData: any) => userData.labelNames)?.labelNames?.map((item: any) => item.label) || [],
    uid: data.find((userData: any) => userData.uid)?.uid,
  });
  
  export async function getUsers(userType: UserType) {
    try {
      const baseUrl = 'https://petwalker-d43e0-default-rtdb.europe-west1.firebasedatabase.app';
      const endpoint = `${baseUrl}/${userType === USER_TYPES.OWNERS ? 'owners.json' : 'petSitters.json'}`;
      
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      if (!data) return [];
  
      return Object.entries(data).map(([id, entry]: [string, any]) => {
        const insideData = entry.sitterData;
        
        if (userType === USER_TYPES.OWNERS) {
          return {
            id,
            ...extractBaseUserData(insideData)
          };
        }
        
        return {
          id,
          ...extractSitterData(insideData)
        };
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error; // Or handle the error as needed for your application
    }
  }