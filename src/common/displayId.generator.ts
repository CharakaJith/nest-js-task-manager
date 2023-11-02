import { nanoid } from 'nanoid';

const SEPARATOR_HYPHEN = '-';

export async function DISPLAY_ID_TASK(): Promise<string> {
  return 'TASK' + SEPARATOR_HYPHEN + nanoid();
}
