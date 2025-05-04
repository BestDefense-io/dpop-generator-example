# Variables
IMAGE_NAME=dpop-generator

# Build the Docker image
build:
	docker build -t $(IMAGE_NAME) .

# Run with default HTU and HTM
run:
	docker run --rm $(IMAGE_NAME)

# Run with custom HTU and HTM (override by passing: make run-custom HTU=https://... HTM=POST)
run-custom:
	read -p "Enter HTU:" HTU; \
	read -p "Enter HTML:" HTM; \
	docker run --rm \
		-e DPOP_HTU="$$HTU" \
		-e DPOP_HTM="$$HTM" \
		$(IMAGE_NAME)

# Clean image (optional)
clean:
	docker rmi $(IMAGE_NAME)

