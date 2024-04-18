import { Action, Location } from 'history';

export const checkPrevPath = (
    prevLocation:
        | Array<{
              location?: Location | null | undefined;
              action?: Action | null | undefined;
          }>
        | undefined,
    path: string,
) => prevLocation?.length && prevLocation[1]?.location?.pathname === path;
