import { withRouter, NextRouter } from "next/dist/client/router"
import { ThemeProvider,Box,Flex } from "@chakra-ui/core";

type Prop = {
  router: NextRouter
}
function getRoomName(router:NextRouter){
  return  router.query.name || "public"
}
function ChatApp({router}:Prop){
  return (
    <ThemeProvider>
      <Box
      as="nav"
      bg="gray.400"
      fontSize="sm"
      color="gray.900"
      padding="4"
      >
       100 

      </Box>
      chat {getRoomName(router)}
    </ThemeProvider>
  )
}


export default withRouter(ChatApp)