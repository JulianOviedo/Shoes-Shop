import { useEffect, useState } from 'react'
import CustomFilter from '@components/CustomFilter/CustomFilter'
import HeaderLoggedIn from '@components/HeaderLoggedIn/HeaderLoggedIn'
import ProductCard from '@components/ProductCard/ProductCard'
import SeparationLine from '@components/SeparationLine/SeparationLine'
import { Box, CircularProgress, Grid, Typography } from '@mui/material'
import { useTheme } from '@mui/system'
import { useQuery } from '@tanstack/react-query'
import { getBrands } from 'helpers/products/getBrands'
import { getColors } from 'helpers/products/getColors'
import { getGenders } from 'helpers/products/getGenders'
import { getProducts } from 'helpers/products/getProducts'
import { getSizes } from 'helpers/products/getSizes'
import Head from 'next/head'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const BASE_QUERY = {
  filters: {
    userID: {
      id: {
        $notNull: true
      }
    },
    teamName: {
      $eq: 'ea-team'
    }
  },
  populate: '*',
  pagination: {
    page: 1,
    pageSize: 100
  }
}

export const getStaticProps = async () => {
  const genders = await getGenders()
  const brands = await getBrands()
  const colors = await getColors()
  const sizes = await getSizes()

  return {
    props: {
      brands: brands.data.map((brand) => brand.attributes.name),
      genders: genders.data.map((gender) => gender.attributes.name),
      colors: colors.data.map((color) => color.attributes.name),
      sizes: sizes.data.map((size) => size.attributes.value)
    }
  }
}

export default function SearchResults({ genders, brands, colors, sizes }) {
  // Filters
  const [showFilters, setShowFilters] = useState(false) // State to show/hide the side filters

  const theme = useTheme()

  const [filtersArray, setFiltersArray] = useState([])

  const [queryObj, setQueryObj] = useState(BASE_QUERY)

  const { data, isLoading } = useQuery({
    queryKey: ['products', queryObj],
    queryFn: () => {
      return getProducts(`?${qs.stringify(queryObj)}`)
    }
  })

  const qs = require('qs')

  const [opacity, setOpacity] = useState('')
  const [screenWidth, setScreenWidth] = useState(0)

  const handleSearchInput = (e) => {
    let value = e.target.value

    if (value.length < 3) {
      value = '' // if the value is less than 3 characters, we don't want to search
    }
    setQueryObj({
      ...queryObj,
      filters: {
        ...queryObj.filters,
        name: {
          $containsi: value
        }
      }
    })
  }

  const handleFilters = (e, key, value) => {
    const checked = e.target.checked

    console.log(key)

    if (checked) {
      const newFilters = [...filtersArray, value]
      setFiltersArray(newFilters)
      console.log(newFilters)

      const newQueryObj = {
        ...queryObj,
        filters: {
          ...queryObj.filters,
          [key]: {
            name: {
              $in: newFilters
            }
          }
        }
      }

      setQueryObj(newQueryObj)
    }

    if (!checked) {
      const newFilters = filtersArray.filter((item) => item !== value)
      setFiltersArray(newFilters)

      const newQueryObj = {
        ...queryObj,
        filters: {
          ...queryObj.filters,
          [key]: {
            name: {
              $in: newFilters
            }
          }
        }
      }

      delete newQueryObj.filters[key]

      setQueryObj(newQueryObj)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', () => {
      setScreenWidth(window.innerWidth)
    })
  })

  const showFiltersBlock = () => {
    setShowFilters(!showFilters)
    ;(screenWidth <= 599) & (showFilters === false) && setOpacity('65%')
    ;(screenWidth <= 599) & (showFilters === true) && setOpacity('100%')
  }

  return (
    <>
      <Head>
        <title>Search - Shoes Shop</title>
      </Head>
      <HeaderLoggedIn
        pages={['Home', 'Bag', 'Add Product']}
        links={['/', '/bag', '/add-product']}
        cart={true}
        burger={true}
        opacity={opacity}
        handleInputChange={handleSearchInput}
      />

      <Box
        display={{
          xs: 'block',
          sm: 'flex'
        }}
        sx={{
          width: '100%'
        }}
      >
        {/* DESKTOP FILTERS */}
        {showFilters && (
          <Box
            sx={{
              minWidth: '320px',
              heigth: 'auto',
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column'
            }}
          >
            <Box sx={{ py: '1.75rem', px: '2.5rem' }}>
              <Typography variant="p" sx={{ fontWeight: '300' }}>
                Shoes/Air Force 1
              </Typography>
              <Typography variant="h3">Air Force 1 (137)</Typography>
            </Box>

            <SeparationLine />

            {/* FILTER BLOCK */}
            {/* Gender */}
            <CustomFilter
              filterName={'Gender'}
              handleFilters={handleFilters}
              category={genders}
            />

            <SeparationLine />

            {/* Brand */}
            <CustomFilter
              filterName={'Brand'}
              handleFilters={handleFilters}
              category={brands}
              isBrand={true}
              handleInput={handleSearchInput}
            />

            <SeparationLine />

            {/* Color */}
            <CustomFilter
              filterName={'Color'}
              handleFilters={handleFilters}
              category={colors}
            />

            <SeparationLine />

            {/* Size */}
            <CustomFilter
              filterName={'Size'}
              handleFilters={handleFilters}
              category={sizes}
            />
          </Box>
        )}

        {/* MOBILE FILTERS */}
        {/* FILTER BLOCK */}
        {showFilters && (
          <Box
            sx={{
              maxWidth: '320px',
              minHeight: '100vh',
              width: 'auto',
              display: { xs: 'flex', sm: 'none' },
              flexDirection: 'column',
              right: 0,
              top: 0,
              position: 'absolute',
              zIndex: 100,
              background: 'white'
            }}
          >
            <Box sx={{ maxWidth: '320px' }}>
              <Typography
                sx={{
                  display: 'flex',
                  justifyContent: 'end',
                  mt: '25px',
                  px: '2.5rem'
                }}
                onClick={showFiltersBlock}
              >
                X
              </Typography>

              {/* Gender */}
              <CustomFilter
                filterName={'Gender'}
                handleFilters={handleFilters}
                category={genders}
              />

              <SeparationLine />

              {/* Brand */}
              <CustomFilter
                filterName={'Brand'}
                handleFilters={handleFilters}
                category={brands}
                isBrand={true}
                // handleInput={handleInput}
              />

              <SeparationLine />

              {/* Color */}
              <CustomFilter
                filterName={'Color'}
                handleFilters={handleFilters}
                category={colors}
              />

              <SeparationLine />

              {/* Size */}
              <CustomFilter
                filterName={'Size'}
                handleFilters={handleFilters}
                category={sizes}
              />
            </Box>
          </Box>
        )}

        {/* CONTAINER ZAPATILLAS */}
        <Box
          sx={{
            mt: '20px',
            [theme.breakpoints.down('sm')]: { opacity: `${opacity}` },
            width: '100%'
          }}
        >
          <Box
            sx={{
              paddingInline: { xs: '1rem', md: '3.5rem' },

              [theme.breakpoints.up('sm')]: {
                mt: '68px',
                display: 'flex',
                justifyContent: 'space-between'
              },
              [theme.breakpoints.down('sm')]: {
                width: 'auto',
                mt: 'auto'
              }
            }}
          >
            <Typography variant="h1">Search Results</Typography>

            {screenWidth < 599 && <SeparationLine />}

            <Typography sx={{ display: { sm: 'none' } }}>
              Shoes/Air Force 1
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between '
              }}
            >
              <Typography variant="h1" sx={{ display: { sm: 'none' } }}>
                Air Force 1 (137)
              </Typography>
              <Box sx={{ display: 'flex' }}>
                {showFilters ? (
                  <Typography
                    sx={{
                      display: { xs: 'none', md: 'block' },
                      fontWeight: 400,
                      fontSize: '24px',
                      lineHeight: '28px',
                      mr: '6px'
                    }}
                  >
                    Hide Filters
                  </Typography>
                ) : (
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: '24px',
                      lineHeight: '28px',
                      mr: '6px'
                    }}
                  >
                    Filters
                  </Typography>
                )}

                {/* FILTER-REMOVE ICON */}
                <Box
                  onClick={showFiltersBlock}
                  component="img"
                  src="/filter-remove.png"
                  sx={{ width: '24px', height: '24px', cursor: 'pointer' }}
                />
              </Box>
            </Box>
          </Box>
          <Grid
            container
            sx={{
              my: '20px',
              justifyContent: { xs: 'center', md: 'start' },
              paddingInline: { xs: '1rem', md: '3.5rem' },
              gap: '3rem'
            }}
            columns={{ xs: 6, md: 11, lg: 14 }}
          >
            {data?.data.map(({ id, attributes }) => (
              <ProductCard
                key={id}
                image={BASE_URL + attributes.images.data[0].attributes.url}
                productTitle={attributes.name}
                productPrice={attributes.price}
                productDescription={
                  attributes.gender.data.attributes.name + "'s shoes."
                }
              />
            ))}
            {data?.data.length === 0 && (
              <Typography variant="main">No results found.</Typography>
            )}

            {isLoading && (
              <Box
                sx={{
                  width: '100%',
                  height: '20rem',
                  display: 'grid',
                  placeContent: 'center'
                }}
              >
                <CircularProgress size={50} color="primary" />
              </Box>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  )
}
