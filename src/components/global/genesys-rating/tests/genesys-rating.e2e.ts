import { newE2EPage } from '@stencil/core/testing'

describe('genesys-rating', () => {
  it('renders', async () => {
    const page = await newE2EPage()

    await page.setContent('<genesys-rating></genesys-rating>')
    const element = await page.find('genesys-rating')
    expect(element).toHaveClass('hydrated')
  })

  it('renders should create stars', async () => {
    const page = await newE2EPage()

    await page.setContent('<genesys-rating></genesys-rating>')
    const components = await page.findAll('svg');
    expect(components.length).toBe(5);
  })
})
