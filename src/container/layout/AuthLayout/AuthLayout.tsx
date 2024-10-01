import { Outlet } from 'react-router-dom'

import Flex from '@/components/Flex'
import Container from '@/components/Container/Container'

import { SEOAIRankerIcon } from '@/assets/icons/svgs'

import './AuthLayout.scss'

const AuthLayout = () => {
  return (
    <Flex className="auth-layout" align="center" justify="evenly" padding={'0px 100px'}>
      <Container width={30}>
        <Flex justify="start">
          <div className="brand-icon auth-container" title="SEO AI Ranker icon">
            {SEOAIRankerIcon}
          </div>
        </Flex>
      </Container>
      <Outlet />
    </Flex>
  )
}

export default AuthLayout
