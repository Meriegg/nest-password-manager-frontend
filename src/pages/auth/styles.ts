import { createStyles } from '@mantine/core'

export const useStyles = createStyles((theme) => ({
  mainContainer: {
    maxWidth: '550px',
    margin: 'auto',
    marginTop: '50px',
    padding: '5px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  formBottom: {
    width: '100%',
    display: 'inline-flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'flex-end',
    marginTop: '20px',
  },
  bottomLink: {
    color:
      theme.colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.gray[9],
  },
}))
