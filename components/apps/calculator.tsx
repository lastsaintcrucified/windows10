"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Calculator() {
  const [display, setDisplay] = useState("0")
  const [previousValue, setPreviousValue] = useState<number | null>(null)
  const [operation, setOperation] = useState<string | null>(null)
  const [waitingForOperand, setWaitingForOperand] = useState(false)

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num)
      setWaitingForOperand(false)
    } else {
      setDisplay(display === "0" ? num : display + num)
    }
  }

  const inputOperation = (nextOperation: string) => {
    const inputValue = Number.parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

      setDisplay(String(newValue))
      setPreviousValue(newValue)
    }

    setWaitingForOperand(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue
      case "-":
        return firstValue - secondValue
      case "×":
        return firstValue * secondValue
      case "÷":
        return firstValue / secondValue
      case "=":
        return secondValue
      default:
        return secondValue
    }
  }

  const performCalculation = () => {
    const inputValue = Number.parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      setDisplay(String(newValue))
      setPreviousValue(null)
      setOperation(null)
      setWaitingForOperand(true)
    }
  }

  const clear = () => {
    setDisplay("0")
    setPreviousValue(null)
    setOperation(null)
    setWaitingForOperand(false)
  }

  return (
    <div className="p-4 bg-gray-50 h-full">
      <div className="max-w-xs mx-auto bg-black rounded-lg p-4">
        {/* Display */}
        <div className="bg-black text-white text-right text-2xl p-4 rounded mb-4 min-h-16 flex items-center justify-end">
          {display}
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-4 gap-2">
          <Button variant="outline" className="h-12" onClick={clear}>
            C
          </Button>
          <Button variant="outline" className="h-12">
            ±
          </Button>
          <Button variant="outline" className="h-12">
            %
          </Button>
          <Button variant="outline" className="h-12 bg-orange-500 text-white" onClick={() => inputOperation("÷")}>
            ÷
          </Button>

          <Button variant="outline" className="h-12" onClick={() => inputNumber("7")}>
            7
          </Button>
          <Button variant="outline" className="h-12" onClick={() => inputNumber("8")}>
            8
          </Button>
          <Button variant="outline" className="h-12" onClick={() => inputNumber("9")}>
            9
          </Button>
          <Button variant="outline" className="h-12 bg-orange-500 text-white" onClick={() => inputOperation("×")}>
            ×
          </Button>

          <Button variant="outline" className="h-12" onClick={() => inputNumber("4")}>
            4
          </Button>
          <Button variant="outline" className="h-12" onClick={() => inputNumber("5")}>
            5
          </Button>
          <Button variant="outline" className="h-12" onClick={() => inputNumber("6")}>
            6
          </Button>
          <Button variant="outline" className="h-12 bg-orange-500 text-white" onClick={() => inputOperation("-")}>
            -
          </Button>

          <Button variant="outline" className="h-12" onClick={() => inputNumber("1")}>
            1
          </Button>
          <Button variant="outline" className="h-12" onClick={() => inputNumber("2")}>
            2
          </Button>
          <Button variant="outline" className="h-12" onClick={() => inputNumber("3")}>
            3
          </Button>
          <Button variant="outline" className="h-12 bg-orange-500 text-white" onClick={() => inputOperation("+")}>
            +
          </Button>

          <Button variant="outline" className="h-12 col-span-2" onClick={() => inputNumber("0")}>
            0
          </Button>
          <Button variant="outline" className="h-12" onClick={() => inputNumber(".")}>
            .
          </Button>
          <Button variant="outline" className="h-12 bg-orange-500 text-white" onClick={performCalculation}>
            =
          </Button>
        </div>
      </div>
    </div>
  )
}
