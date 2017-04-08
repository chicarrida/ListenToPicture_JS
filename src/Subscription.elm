module Subscription exposing (..)

import Interop exposing (..)
import Model exposing (..)


type Msg
  = PlayNote
  | ReceivePixel (List Float)


subscriptions : Model -> Sub Msg
subscriptions {scene} =
  hslPixel ReceivePixel
