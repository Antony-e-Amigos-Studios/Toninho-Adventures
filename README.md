## Esquema de Toninho
### main.et
```ruby
# player.js
GameObject player {
  proc update do
    alias self.movement mov;
    ...
  end
}

proc entry do
  init_all;
  all(sounds,play);
end
``` 
