﻿using System;
using OpenTK;
using OpenTK.Graphics.OpenGL;
using OpenTK.Input;

namespace PongGame
{
    internal class Program : GameWindow
    {
        int xDaBola = 0;
        int yDaBola = 0;
        int tamanhoDaBola = 20;
        int velocidadeDaBolaEmX = 3;
        int velocidadeDaBolaEmY = 3;

        int yDoJogador1 = 0;
        int yDojogador2 = 0;
          
        int xDojogador1()
        {
            return -ClientSize.Width / 2 + larguraDosJogadores() / 2;
        }

        int xDojogador2()
        {
            return ClientSize.Width / 2 - larguraDosJogadores() / 2;
        }

        int larguraDosJogadores()
        {
            return tamanhoDaBola;
        }

        int alturaDosJogadores()
        {
            return 3 * tamanhoDaBola;
        }

        protected override void OnUpdateFrame(FrameEventArgs e)
        {
            xDaBola = xDaBola + velocidadeDaBolaEmX;
            yDaBola = yDaBola + velocidadeDaBolaEmY;

            if (xDaBola + tamanhoDaBola / 2 > xDojogador2() - larguraDosJogadores() / 2
                && yDaBola - tamanhoDaBola / 2 < yDojogador2 + alturaDosJogadores() / 2
                && yDaBola + tamanhoDaBola / 2 > yDojogador2 - alturaDosJogadores() / 2)
            {
                velocidadeDaBolaEmX = -velocidadeDaBolaEmX;
            }

            if (xDaBola - tamanhoDaBola / 2 < xDojogador1() + larguraDosJogadores() / 2
                && yDaBola - tamanhoDaBola / 2 < yDoJogador1 + alturaDosJogadores() / 2
                && yDaBola + tamanhoDaBola / 2 > yDoJogador1 - alturaDosJogadores() / 2)
            {
                velocidadeDaBolaEmX = -velocidadeDaBolaEmX;
            }

            if (yDaBola + tamanhoDaBola / 2 > ClientSize.Height / 2)
            {
                velocidadeDaBolaEmY = -velocidadeDaBolaEmX;
            }

            if (yDaBola - tamanhoDaBola / 2 < -ClientSize.Height / 2)
            {
                velocidadeDaBolaEmY = -velocidadeDaBolaEmX;
            }

            if (xDaBola < -ClientSize.Width / 2 || xDaBola > ClientSize.Width / 2)
            {
                xDaBola = 0;
                yDaBola = 0;

            }

            if (Keyboard.GetState().IsKeyDown(Key.W))
            {
                yDoJogador1 = yDoJogador1 + 5;
            }

            if (Keyboard.GetState().IsKeyDown(Key.S))
            {
                yDoJogador1 = yDoJogador1 - 5;
            }

            if (Keyboard.GetState().IsKeyDown(Key.Up))
            {
                yDojogador2 = yDojogador2 + 5;
            }

            if (Keyboard.GetState().IsKeyDown(Key.Down))
            {
                yDojogador2 = yDojogador2 - 5;
            }
        }

        protected override void OnRenderFrame(FrameEventArgs e)
        {
            GL.Viewport(0, 0, ClientSize.Width, ClientSize.Height);

            Matrix4 projection = Matrix4.CreateOrthographic(ClientSize.Width, ClientSize.Height, 0.0f , 1.0f);
            GL.MatrixMode(MatrixMode.Projection);
            GL.LoadMatrix(ref projection);

            GL.Clear(ClearBufferMask.ColorBufferBit);

            DesenharRetangulo(xDaBola, yDaBola, tamanhoDaBola, tamanhoDaBola, 1.0f, 1.0f, 0.0f);
            DesenharRetangulo(xDojogador1(), yDoJogador1, larguraDosJogadores(), alturaDosJogadores(), 1.0f, 0.0f, 0.0f);
            DesenharRetangulo(xDojogador2(), yDojogador2, larguraDosJogadores(), alturaDosJogadores(), 0.0f, 0.0f, 1.0f);

            SwapBuffers();
        }

        void DesenharRetangulo(int x, int y, int largura, int altura, float r, float g, float b)
        {
            GL.Color3(r, g, b);

            GL.Begin(PrimitiveType.Quads);
            GL.Vertex2(-0.5f * largura + x, -0.5f * altura + y);
            GL.Vertex2(0.5f * largura + x, -0.5f * altura + y);
            GL.Vertex2(0.5f * largura + x, 0.5f * altura + y);
            GL.Vertex2(-0.5f * largura + x, 0.5f * altura + y);
            GL.End();
        }

        static void Main()
        {
            new Program().Run();
        }
    }
}
