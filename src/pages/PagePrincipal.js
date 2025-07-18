import { Box, Image, Flex, Heading, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
import logo from '../img/logos/faviconE.png';

function PagePrincipal() {

    const navigate = useNavigate();

    return (
        <Box
            w='100%'
            >
            <Flex
                direction='column'
                alignItems='center'
                rowGap='100px'
                h='100vh'
                backgroundColor='brand.primary'
                >
                <Flex
                    direction='column'
                    alignItems='center'
                    pt='30px'
                    >
                    <Box
                        bg='brand.primary'
                        display='flex'
                        >
                        <Image src={logo} borderRadius='100%' w='150px'/>
                    </Box>
                    <Heading
                        color='brand.secondary'
                        textAlign='center'
                        fontFamily="'Playfair Display', serif"
                        fontSize={['50px', '60px', '70px']}
                        letterSpacing='7px'
                        >
                        ESTUDIO EUNOIA
                    </Heading>
                </Flex>

                <Flex
                    gap='100px'
                    direction={['column', 'row']}
                    >
                    <Button
                        fontFamily="'Playfair Display', serif"
                        letterSpacing='3px'
                        onClick={() => navigate('/home')}
                        fontSize={['20px', '25px', '30px']}
                        p={10}
                        border='1px solid white'
                        >
                        PILATES REFORMER
                    </Button>
                    <Button
                        as='a'
                        href="https://cadillac-three.vercel.app/"
                        fontFamily="'Playfair Display', serif"
                        letterSpacing='3px'
                        fontSize={['20px', '25px', '30px']}
                        p={10}
                        border='1px solid white'
                        >
                        PILATES CADILLAC
                    </Button>
                </Flex>
            </Flex>
        </Box>
    )
}

export default PagePrincipal