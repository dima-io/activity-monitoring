<template>
  <v-container>
    <v-card>
      <v-card-title>
        <div class="text-label-medium text-uppercase my-1">
          21 липня 2017 рік
        </div>

        <div class="text-blue-darken-2 text-body-small font-weight-bold">
          2650 кроків
        </div>

        <div
          class="text-title-large text-medium-emphasis text-body-small font-weight-regular"
        >
          Залишилось 2350 кроків
        </div>
      </v-card-title>

      <v-card-text>
        <v-progress-linear
          color="blue-darken-2"
          height="22"
          model-value="60"
          rounded="lg"
        />

        <div class="d-flex justify-space-between mt-2">
          <div>
            <span class="text-blue-darken-2 font-weight-medium">Ціль: </span>
            <span class="text-medium-emphasis font-weight-medium"
              >5000 кроків</span
            >
          </div>
          <div>
            <span class="text-blue-darken-2 font-weight-medium"
              >Пройдено:
            </span>
            <span class="text-medium-emphasis font-weight-medium"
              >2600 кроків</span
            >
          </div>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>
