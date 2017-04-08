port module Interop exposing (..)

port play : Float -> Cmd msg

port hslPixel : (List Float -> msg) -> Sub msg
