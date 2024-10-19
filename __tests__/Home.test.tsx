import '@testing-library/jest-dom'

import {render, screen} from "@testing-library/react"
import Home from "@/app/page"


describe("Main pages tests", () => {
    it("should have Image Cover", () => {
        render(<Home />) // ARRANGE
        const ImageCover = screen.getByText("Rifas el Magnate"); // ACTION
        expect(ImageCover).toBeInTheDocument(); // ASSERT
    })
})