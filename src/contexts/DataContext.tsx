import { api } from 'api/api';
import { AxiosResponse } from 'axios';
import React, { createContext, Dispatch, SetStateAction } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useToasts } from 'react-toast-notifications';
import { Cities, City, State, States } from 'utils/types';

interface DataContextType {
  cities: Cities | undefined;
  states: States | undefined;
  loading: boolean;
  setCities: Dispatch<SetStateAction<City[] | undefined>>;
  setStates: Dispatch<SetStateAction<State[] | undefined>>;
  getCitiesByStateId: (stateId: string) => Promise<AxiosResponse<City[]>>;
  deleteStateById: (id: string) => Promise<void>;
  deleteCityById: (id: string) => Promise<void>;
  createNewCity: (cityName: string, stateId: string) => Promise<void>;
  createNewState: (stateName: string) => Promise<void>;
  updateState: (newStateName: string, stateId: string) => Promise<void>;
  updateCity: (newCityName: string, cityId: string) => Promise<void>;
  getData: () => void;
}

export const DataContext = createContext({} as DataContextType);

export const DataContextProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState<Array<City>>();
  const [states, setStates] = useState<States>();
  const { addToast } = useToasts();

  useEffect(() => {
    const getData = async (): Promise<void> => {
      setLoading(true);
      const citiesResponse = await api.get(`/cities`);
      const statesResponse = await api.get(`/states`);
      setCities(citiesResponse.data);
      setStates(statesResponse.data);
      setLoading(false);
    };
    getData();
  }, []);

  const getData = async (): Promise<void> => {
    setLoading(true);
    const citiesResponse = await api.get(`/cities`);
    const statesResponse = await api.get(`/states`);
    setCities(citiesResponse.data);
    setStates(statesResponse.data);
    setLoading(false);
  };

  const getCitiesByStateId = async (
    stateId: string,
  ): Promise<AxiosResponse<City[]>> => {
    const response = await api.get(`/cities?stateId=${stateId}`);
    return response;
  };

  const deleteStateById = async (id: string): Promise<void> => {
    await api.delete(`/states/${id}`);
  };

  const deleteCityById = async (id: string): Promise<void> => {
    await api.delete(`/cities/${id}`);
  };

  const createNewCity = async (
    cityName: string,
    stateId: string,
  ): Promise<void> => {
    try {
      const response = await api.post('/cities', {
        name: cityName,
        stateId,
      });
      if (response.status === 200) {
        addToast('Estado cadastrado com sucesso', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    } catch {
      addToast('Não foi possivel cadastrar!', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  const createNewState = async (stateName: string): Promise<void> => {
    try {
      const response = await api.post('/states', {
        name: stateName,
      });
      if (response.status === 200) {
        addToast('Estado cadastrado com sucesso', {
          appearance: 'success',
          autoDismiss: true,
        });
      }
    } catch {
      addToast('Não foi possivel cadastrar!', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  const updateState = async (
    newStateName: string,
    stateId: string,
  ): Promise<void> => {
    try {
      const response = await api.put(`/states/${stateId}`, {
        name: newStateName,
      });
      if (response.status === 200) {
        addToast('Nome atualizado com sucesso', {
          appearance: 'info',
          autoDismiss: true,
        });
      }
    } catch {
      addToast('Não foi possivel atualizar!', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  const updateCity = async (
    newCityName: string,
    cityId: string,
  ): Promise<void> => {
    try {
      const response = await api.put(`/cities/${cityId}`, {
        name: newCityName,
      });
      if (response.status === 200) {
        addToast('Nome atualizado com sucesso', {
          appearance: 'info',
          autoDismiss: true,
        });
      }
    } catch {
      addToast('Não foi possivel atualizar!', {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  };

  return (
    <DataContext.Provider
      value={{
        cities,
        loading,
        setCities,
        states,
        setStates,
        getCitiesByStateId,
        deleteStateById,
        deleteCityById,
        createNewCity,
        createNewState,
        updateState,
        updateCity,
        getData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
