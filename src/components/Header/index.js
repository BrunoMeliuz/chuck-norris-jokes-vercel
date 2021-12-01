import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Grid,
  GridItem,
  Container,
  FormControl,
  FormLabel,
  Select,
  Tag,
  TagLabel,
  TagCloseButton
} from '@chakra-ui/react'
import Logo from '../../assets/logo.jpeg';

import api from '../../services/api'


const Header = () => {
  const [main, setMain] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    api.get('categories').then(
      res => {
        setMain(res.data)
      }
    )
  }, [])

  const handleCategory = (e) => {
    const alreadyExists = selectedCategories.find((selecCat) => {
      return selecCat === e.target.value;
    })

    if (!alreadyExists) {
      setSelectedCategories([...selectedCategories, e.target.value])
    }

    console.log(`Category - ${e.target.value}`)
    navigate(`/categories/${e.target.value}`)
  }

  function handleTag(item) {
    /*
      Meu objetivo é pesquisar piadas com categorias que já foram pesquisadas pelo usuario,
      entretanto esta função não está sendo chamada ao clicar no botão da Tag.
    */
    console.log(`Tag - ${item}`)
    //navigate(`/categories/${selectedCategories[ind]}`)
  }

  return (
    <nav>
      <Container maxW="container.xl">
        <Grid templateColumns="repeat(5, 1fr)" gap={10}>
          <GridItem colStart={1} colEnd={2}>
            <Link to='/'>
              <img src={Logo} className="logo" alt="Logo" />
            </Link>
          </GridItem>
          <GridItem className="categorias-selecionadas" colStart={2} colEnd={8}>
            <FormControl>
              <FormLabel className="categorias-selecionadas-label">Categorias já pesquisadas</FormLabel>
              {selectedCategories?.map((item) => (
                <Tag
                  size='lg'
                  key={item}
                  borderRadius='full'
                  variant='solid'
                  colorScheme='gray'
                >
                  <TagLabel>{item}</TagLabel>
                  <TagCloseButton onClick={handleTag(item)} />
                </Tag>
              ))}
            </FormControl>
          </GridItem>
          <GridItem colStart={8} colEnd={12} h="150px">
            <FormControl>
              <FormLabel>Selecione a categoria de sua piada</FormLabel>
              <Select onChange={handleCategory}>
                {main?.map((item, index) => (
                  <option key={index} value={item}> {item} </option>
                ))}
              </Select>
            </FormControl>
          </GridItem>
        </Grid>
      </Container>
    </nav>
  )
}

export default Header;