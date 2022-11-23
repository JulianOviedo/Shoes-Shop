import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ChartShoeCard from '@components/ChartShoeCard/ChatShoeCard'
import HeaderLoggedIn from '@components/HeaderLoggedIn/HeaderLoggedIn'
import PrimaryButton from '@components/PrimaryButton/PrimaryButton'
import SecondaryButton from '@components/SecondaryButton/SecondaryButton'
import { Divider, Grid, Stack, Typography, useTheme } from '@mui/material'
import { Box } from '@mui/system'
import { reducePrice } from 'helpers/reducePrice'

const pages = ['Home', 'Add Product', 'Search']
const links = ['/home', '/add-product', '/search-results']

const Bag = () => {
  const [shoes, setShoes] = useState([])

  useEffect(() => {
    if (localStorage.getItem('shoes')) {
      setShoes(JSON.parse(localStorage.getItem('shoes')))
    }
  }, [])

  useEffect(() => {
    setSubTotal(reducePrice(shoes))
  }, [shoes])

  const theme = useTheme()
  const [subTotal, setSubTotal] = useState(reducePrice(shoes))

  const deleteShoe = (id) => {
    const newShoes = shoes.filter((shoe) => shoe.id !== id)
    setShoes(newShoes)
    localStorage.setItem('shoes', JSON.stringify(newShoes))
    setSubTotal(reducePrice(newShoes))
  }

  const changeQuantity = (id, quantity) => {
    const newShoes = shoes.map((shoe) =>
      shoe.id === id ? { ...shoe, quantity } : shoe
    )
    setShoes(newShoes)
    localStorage.setItem('shoes', JSON.stringify(newShoes))
    setSubTotal(reducePrice(newShoes))
  }

  const handleClick = () => {
    if (shoes.length === 0) {
      toast.error('Please add some items first!')
      return
    }
    localStorage.removeItem('shoes')
    setShoes([])
    toast.success('Thank you for your purchase!')
  }

  return (
    <>
      <HeaderLoggedIn pages={pages} links={links} burger={true} cart={true} />

      <Grid container p={2}>
        <Box
          py={8}
          sx={{
            display: 'flex',
            width: '100%',
            maxWidth: '1500px',
            marginInline: 'auto',
            [theme.breakpoints.up('md')]: {
              gap: '1.5rem'
            }
          }}
        >
          {/* Left container */}
          <Box sx={{ width: '100%', maxWidth: '963px' }}>
            <Typography variant="h1">Chart</Typography>

            {/* Cards */}
            <Grid item xs={12} mt={5} sx={{ marginInline: 'auto' }}>
              <Stack spacing={3} mb={3}>
                {shoes.map((shoe) => (
                  <ChartShoeCard
                    key={shoe.id}
                    id={shoe.id}
                    name={shoe.name}
                    changeQuantity={changeQuantity}
                    deleteShoe={deleteShoe}
                    price={shoe.price}
                    description={shoe.description}
                    img={shoe.img}
                    initialQuantity={shoe.quantity}
                  />
                ))}

                {shoes.length === 0 && (
                  <Typography variant="main">No shoes in the cart</Typography>
                )}
              </Stack>

              <Box
                sx={{
                  maxWidth: '432px',
                  marginInline: 'auto',
                  marginTop: '3rem',
                  display: { xs: 'block', md: 'none' }
                }}
              >
                <PrimaryButton>Go to checkout</PrimaryButton>
              </Box>
            </Grid>
          </Box>

          {/* Summary - Right Container */}
          <Box
            sx={{
              marginLeft: 'auto'
            }}
          >
            <Box
              sx={{
                width: '399px',
                marginInline: 'auto',
                textAlign: 'left',
                display: { xs: 'none', md: 'block' }
              }}
            >
              <Typography variant="h1">Summary</Typography>

              <Box sx={{ marginTop: '3rem' }} />

              <Typography variant="p">Do you have a promocode?</Typography>

              <Box
                sx={{
                  marginTop: '1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '.5rem'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Subtotal</Typography>
                  <Typography variant="body2">${subTotal}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Shipping</Typography>
                  <Typography variant="body2">$20</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2">Tax</Typography>
                  <Typography variant="body2">$0</Typography>
                </Box>

                <Divider sx={{ marginBlock: '1rem' }} />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: '500'
                  }}
                >
                  <Typography variant="body2">Total</Typography>
                  <Typography variant="body2">${subTotal + 20}</Typography>
                </Box>

                <Divider sx={{ marginBlock: '1rem' }} />

                <SecondaryButton>PayPal</SecondaryButton>
                <PrimaryButton onClick={handleClick}>Checkout</PrimaryButton>
              </Box>
            </Box>
          </Box>
        </Box>
      </Grid>
    </>
  )
}

export default Bag
