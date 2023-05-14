import useSWR from 'swr';
import NextPatientView from './NextPatientView';
import { API_BASE_URL, FETCHER } from '@/shared/api';

export default function NextPatient() {
  const { data, error } = useSWR(`${API_BASE_URL}/waiting-rooms`, FETCHER);
 
  if (error) return <div>Erreur lors du chargement des prochains patients</div>;

  const waitingRooms = data ? new Map(Object.entries(data)) : undefined;

  return (
    <NextPatientView waitingRooms={waitingRooms} />
  );
}
