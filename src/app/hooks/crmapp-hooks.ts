import { useCallback, useEffect, useState } from 'react';
import { getMeetingsTasksList } from '../services/crmapp';
import { MeetingsTasksType } from '../models/CRMApp/meetings-tasks-type';

export const useGetMeetingsTasksList = () => {
  const [meetingsTasks, setMeetingsTasks] = useState<MeetingsTasksType[]>([]);

  const requestMeetingsTasks = useCallback(() => {
    let ignore = false;
    getMeetingsTasksList()
      .then((data) => {
        if (!ignore) {
          setMeetingsTasks(data);
        }
      })
    return () => {
      ignore = true;
    }
  }, []);

  useEffect(() => {
    requestMeetingsTasks();
  }, [requestMeetingsTasks]);

  return { requestCRMAppMeetingsTasks: requestMeetingsTasks, cRMAppMeetingsTasks: meetingsTasks, setCRMAppMeetingsTasks: setMeetingsTasks };
}
