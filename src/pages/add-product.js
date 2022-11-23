import AddProductForm from '@components/AddProductForm/AddProductForm'
import HeaderLoggedIn from '@components/HeaderLoggedIn/HeaderLoggedIn'
import BarItem from '@components/NavBarItem/NavBarItem'
import PrimaryButton from '@components/PrimaryButton/PrimaryButton'
import ProductImageStore from '@components/ProductImageStore/ProductImageStore'
import SecondaryButton from '@components/SecondaryButton/SecondaryButton'
import ProfileInfoSideBar from '@components/SideBarProfileInfo/SideBarProfileInfo'
import ChatIcon from '@mui/icons-material/Chat'
import ListAltIcon from '@mui/icons-material/ListAlt'
import LogoutIcon from '@mui/icons-material/Logout'
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { getBrands } from 'helpers/products/getBrands'
import { getGenders } from 'helpers/products/getGenders'
import { getSizes } from 'helpers/products/getSizes'
import useAddProductForm from 'hooks/useAddProductForm'
import { signOut } from 'next-auth/react'

export const getStaticProps = async () => {
  const brands = await getBrands()

  const genders = await getGenders()

  const sizes = await getSizes()

  return {
    props: {
      brands: brands.data.map(data => data.attributes.name),
      genders: genders.data.map(data => data.attributes.name),
      sizes: sizes.data.map(data => `EUR-${data.attributes.value}`)
    }
  }
}

export default function AddProduct ({ brands, genders, sizes }) {
  const { inputInfo, setInputInfo, handleInputChange, handleSubmit } = useAddProductForm()

  console.log(inputInfo)

  const theme = useTheme()

  return (
    <>
      <HeaderLoggedIn
        pages={['Home', 'Search', 'Bag']}
        burger={true}
        links={['/home', '/search-results', '/bag']}
      />
      <Box component="main" sx={{ display: 'flex' }}>

        <Box sx={{ display: { xs: 'none', sm: 'block' }, flexDirection: 'column' }}>
          <ProfileInfoSideBar />
          <Box sx={{ display: 'flex', mt: '30px', ml: '46px' }} >
            <ShoppingBagIcon sx={{ color: '#6E7278' }}/>
            <BarItem name="My Orders"/>
          </Box>
          <Box sx={{ display: 'flex', mt: '30px', ml: '46px' }}>
            <ListAltIcon sx={{ color: '#6E7278' }} />
            <BarItem name="Wish List" num={4} />
          </Box>
          <Box sx={{ display: 'flex', mt: '30px', ml: '46px' }}>
            <ChatIcon sx={{ color: '#6E7278' }} />
            <BarItem name="Newsletters" />
          </Box>
          <Box sx={{ display: 'flex', mt: '30px', ml: '46px', cursor: 'pointer' }}>
            <Button
              onClick={() => signOut()}
              sx={{ textTransform: 'none', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <LogoutIcon sx={{ color: '#6E7278' }}/>
              <BarItem name="Log out"/>
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flex: '1',
            flexDirection: 'column',
            p: { xs: '20px', sm: '55px' }
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', flex: '1', mb: '15px' }}>
            <Box sx={{ flex: '1', maxWidth: 890 }}>
              <Typography variant="h1" sx={{ [theme.breakpoints.down('md')]: { fontSize: '30px' } }}>Add Product</Typography>
            </Box>
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, height: 40, width: 323, gap: '19px', flex: '1', justifyContent: 'flex-end' }}>
              <PrimaryButton maxWidth="152px">Schedule</PrimaryButton>
              <SecondaryButton onClick={handleSubmit} form='addProduct' maxWidth="152px">Save</SecondaryButton>
            </Box>
          </Box>
          <Typography variant="p" sx={{ maxWidth: '900px' }} >
                Lorem ipsum, or lipsum as it is sometimes known, is dummy text
                used in laying out print, graphic or web designs. The passage
                is attributed to an unknown typesetter in the 15th century who
                is thought to have scrambled parts of Ciceros De Finibus
                Bonorum et Malorum for use in a type specimen book. It usually
                begins with:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <AddProductForm id='addProduct' brands={brands} genders={genders} sizes={sizes} setInputInfo={setInputInfo} handleInputChange={handleInputChange}/>
            <ProductImageStore/>
          </Box>
        </Box>
      </Box>
    </>
  )
}
