import { useContext } from 'react';
import { AppointmentContext } from '../contexts/AppointmentContext';

export function useAppointment() {
  return useContext(AppointmentContext);
}
