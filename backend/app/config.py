from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    COIN_API_KEY: str = "afccaae73028452a9144bfd3646c32ab"

    model_config = SettingsConfigDict(
        env_file='.env',
        env_file_encoding='utf-8',
        extra='ignore'
    )


settings = Settings()
