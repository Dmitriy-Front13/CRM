"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{isLogin ? 'Вход' : 'Регистрация'}</CardTitle>
          <CardDescription>
            {isLogin
              ? 'Войдите в свою учетную запись'
              : 'Создайте новую учетную запись'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Имя
              </label>
              <Input id="name" placeholder="Введите ваше имя" />
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" placeholder="example@example.com" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Пароль
            </label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
          <Button
            variant="link"
            className="text-sm"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? 'Нет учетной записи? Зарегистрируйтесь'
              : 'Уже есть учетная запись? Войдите'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

