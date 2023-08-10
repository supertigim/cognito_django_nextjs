FROM python:3.11-slim-buster as builder

RUN pip install poetry==1.5.1

ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

WORKDIR /app

COPY pyproject.toml poetry.lock ./

# Generate requirements for development.
RUN poetry export --only dev --without-hashes --no-interaction --no-ansi -f requirements.txt -o requirements.dev.txt

# Generate requirements and install *all* dependencies.
RUN poetry export --without dev --without-hashes --no-interaction --no-ansi -f requirements.txt -o requirements.txt
RUN pip install --upgrade pip
RUN pip install --prefix=/packages --force-reinstall -r requirements.txt

############################################################################
FROM python:3.11-slim-buster  as development

COPY --from=builder /packages /usr/local

WORKDIR /app

# Install required modules for development.  (e.g. gcc, graphviz)
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     gcc build-essential pkg-config graphviz graphviz-dev vim \
#     && rm -rf /var/lib/apt/lists/*


COPY --from=builder /app/requirements.dev.txt /app
RUN pip install -r requirements.dev.txt

COPY . /app


############################################################################
FROM python:3.11-slim-buster as release

COPY --from=builder /packages /usr/local

WORKDIR /app

COPY . /app
