import { useEffect, useState } from 'react'
import Form from '@components/Form/Form'
import HeaderLoggedIn from '@components/HeaderLoggedIn/HeaderLoggedIn'
import BarItem from '@components/NavBarItem/NavBarItem'
import PrimaryInput from '@components/PrimaryInput/PrimaryInput'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined'
import DashboardCustomizeOutlinedIcon from '@mui/icons-material/DashboardCustomizeOutlined'
import GppGoodOutlinedIcon from '@mui/icons-material/GppGoodOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import { Avatar, Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Head from 'next/head'
import { signOut } from 'next-auth/react'

import { theme } from '../styles/theme'

export default function UpdateProfile() {
  const [settings, setSettings] = useState(true)
  const [pages, setPages] = useState([])
  const [links, setLinks] = useState([])
  console.log(pages)

  useEffect(() => {
    setPages(['Home', 'Bag', 'Add Product', 'Search'])
    setLinks(['/home', '/bag', '/add-product', '/search-results'])
  }, [])

  function handleSettings() {
    return setSettings(!settings)
  }

  return (
    <>
      <Head>
        <title>Profile - Shoes Shop</title>
      </Head>
      <HeaderLoggedIn pages={pages} links={links} cart={true} burger={true} />
      <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 4 }}>
        <Box
          sx={{
            display: { xs: 'none' },
            [theme.breakpoints.up('sm')]: {
              display: 'block',
              height: 'auto',
              maxWidth: '320px',
              width: '100%'
            }
          }}
        >
          <Box>
            <Box
              component="img"
              src="/vector.png"
              alt="vector icon"
              onClick={handleSettings}
              sx={{
                position: 'absolute',
                marginLeft: '46px',
                marginTop: '2px',
                transition: 'all 0.5s ease',
                '&:hover': {
                  transform: 'rotate(-90deg)',
                  cursor: 'pointer'
                }
              }}
            />
            <Typography
              sx={{
                fontWeight: '500',
                fontSize: '20px',
                lineHeight: '23px',
                ml: '80px',
                cursor: 'pointer'
              }}
            >
              {' '}
              Settings{' '}
            </Typography>
          </Box>
          {settings && (
            <>
              <Box
                sx={{
                  width: '320px',
                  color: '#EAECF0',
                  border: '1px solid',
                  mt: '40px'
                }}
              ></Box>
              <Box sx={{ display: 'flex', mt: '30px', ml: '46px' }}>
                <AccountCircleOutlinedIcon sx={{ color: '#6E7278' }} />
                <BarItem name="My Profile" />
              </Box>

              <Box sx={{ display: 'flex', mt: '30px', ml: '46px' }}>
                <DashboardCustomizeOutlinedIcon sx={{ color: '#6E7278' }} />
                <BarItem name="Preferences" />
              </Box>

              <Box sx={{ display: 'flex', mt: '30px', ml: '46px' }}>
                <GppGoodOutlinedIcon sx={{ color: '#6E7278' }} />
                <BarItem name="Security" />
              </Box>

              <Box sx={{ display: 'flex', mt: '30px', ml: '46px' }}>
                <AccountBalanceWalletOutlinedIcon sx={{ color: '#6E7278' }} />
                <BarItem name="My Wallet" />
              </Box>
              <Box
                onClick={() => signOut()}
                sx={{
                  display: 'flex',
                  mt: '30px',
                  ml: '46px',
                  cursor: 'pointer'
                }}
              >
                <BarItem name="Log out">
                  {' '}
                  <LogoutIcon sx={{ color: '#6E7278' }} />
                </BarItem>
              </Box>
            </>
          )}
        </Box>

        <Box
          sx={{
            [theme.breakpoints.down('sm')]: {
              maxWidth: '350px',
              width: '100%',
              ml: 'auto',
              mr: 'auto '
            },
            [theme.breakpoints.up('sm')]: {
              width: '400px'
            }
          }}
        >
          <Typography
            sx={{
              color: '#000000',
              fontFamily: 'Work Sans',
              fontStyle: 'normal',
              fontWeight: '500',
              fontSize: '30px',
              lineHeight: '35px',
              ml: '10px'
            }}
          >
            {' '}
            My Profile{' '}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              mt: 4,
              ml: '10px'
            }}
          >
            <Avatar src="/profile_img.png" sx={{ width: 100, height: 100 }} />
            <Box
              sx={{
                ml: '50px',
                height: '80px',
                display: 'grid'
              }}
            >
              <Button
                variant="outlined"
                sx={{
                  color: '#FE645E',
                  fontFamily: 'Work Sans',
                  fontSize: '11px',
                  width: '120px',
                  borderRadius: '6px',
                  height: '35px',
                  mb: '16px'
                }}
              >
                Change photo
              </Button>
              <Button
                sx={{
                  color: '#FFFFFF',
                  fontFamily: 'Work Sans',
                  fontSize: '11px',
                  width: '120px',
                  borderRadius: '6px',
                  height: '30px',
                  boxShadow: 'none'
                }}
                variant="contained"
              >
                Delete
              </Button>
            </Box>
          </Box>
          <Typography
            sx={{
              width: 'auto',
              height: '28px',
              color: '#5C5C5C',
              fontSize: '12px',
              fontWight: '300',
              mt: '16px',
              ml: '10px',
              [theme.breakpoints.up('sm')]: {
                maxWidth: '400px',
                width: 'auto',
                height: 'auto',
                fontSize: '15px'
              }
            }}
          >
            Welcome back! Please enter your details to log into your account.
          </Typography>

          <Form
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingBlock: '1.5rem',
              gap: '1.5rem',
              maxWidth: '350px',
              marginTop: '20px'
            }}
          >
            <PrimaryInput label="Name" placeholder={'Jane'}></PrimaryInput>
            <PrimaryInput
              label="Surname"
              placeholder={'Meldrum'}
            ></PrimaryInput>
            <PrimaryInput
              label="Email"
              placeholder={'example@mail.com'}
            ></PrimaryInput>
            <PrimaryInput
              label="Phone Number"
              placeholder={'(949) 354-2574)'}
            ></PrimaryInput>
          </Form>
        </Box>
      </Box>
    </>
  )
}
